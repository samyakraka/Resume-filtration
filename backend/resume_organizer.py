import google.generativeai as genai
import PyPDF2
import json
import os
from typing import Dict, List

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a PDF file.
    :param pdf_path: Path to the PDF file
    :return: Extracted text as a single string
    """
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

def summarize_resume(resume_text):
    """
    Summarizes the resume using the Gemini 1.5 Flash API.
    :param resume_text: Text extracted from the resume
    :return: Summarized content
    """
    job_description = """
    Skills: Python, SQL, Cloud Computing.
    Experience: 1+ years in software development.
    Education: Bachelor of Technology.
    CGPA: 8.0
    Additional Requirements: Badminton, Cricket.
    """
    genai.configure(api_key="API_KEY")

    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = (
        f"Summarize the following resume on the basis of {job_description} in points under these headings:\n"
        "1. Skills\n2. Experience\n3. Education\n4. Achievements\n"
        "5. Projects\n6. CGPA/GPA\n and 7. unique Accomplishment"
        f"Resume Content:\n{resume_text}"
    )
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating summary: {e}")
        return None

def organize_resumes_by_name(data: List[Dict]) -> Dict:
    """
    Organizes resume summaries into a structured format.
    :param data: List of resume summaries
    :return: Dictionary of organized resume data
    """
    organized = {}
    
    for resume in data:
        name = resume['filename'].split('.')[0]
        summary = resume['summary']
        
        organized[name] = {
            'skills': [],
            'experience': [],
            'education': [],
            'achievements': [],
            'projects': [],
            'cgpa': None
        }
        
        current_section = None
        for line in summary:
            if '**1. Skills:**' in line:
                current_section = 'skills'
            elif '**2. Experience:**' in line:
                current_section = 'experience'
            elif '**3. Education:**' in line:
                current_section = 'education'
            elif '**4. Achievements:**' in line:
                current_section = 'achievements'
            elif '**5. Projects:**' in line:
                current_section = 'projects'
            elif '**6. CGPA/GPA:**' in line:
                current_section = 'cgpa'
            elif line.strip() and line.startswith('*') and current_section != 'cgpa':
                organized[name][current_section].append(line.strip('* '))
            elif current_section == 'cgpa' and line.strip() and line.startswith('*'):
                try:
                    cgpa_str = line.strip('* ')
                    cgpa = float(cgpa_str.split(':')[-1].strip()) if ':' in cgpa_str else float(cgpa_str)
                    organized[name]['cgpa'] = cgpa
                except:
                    pass

    return organized

def process_and_organize_resumes(upload_folder):
    """
    Main function to process PDFs and organize the data.
    :param upload_folder: Path to folder containing PDF resumes
    """
    all_summaries = []
    
    # Process all PDFs and generate summaries
    for filename in os.listdir(upload_folder):
        if filename.endswith('.pdf'):
            pdf_path = os.path.join(upload_folder, filename)
            resume_text = extract_text_from_pdf(pdf_path)

            if resume_text:
                summary = summarize_resume(resume_text)

                if summary:
                    summary_lines = summary.split('\n')
                    summary_data = {"filename": filename, "summary": summary_lines}
                    all_summaries.append(summary_data)
                else:
                    print(f"Failed to summarize the resume: {filename}")
            else:
                print(f"Failed to extract text from the PDF: {filename}")

    # Save the original format summaries (matching final2.py output)
    with open("b.json", "w") as json_file:
        json.dump(all_summaries, json_file, indent=4)
    print("All summaries saved to all_summaries.json")

    # Generate and save the organized format
    organized_data = organize_resumes_by_name(all_summaries)
    with open("b2.json", "w") as json_file:
        json.dump(organized_data, json_file, indent=4)
    print("Organized data saved to organized_resumes.json")

if __name__ == "__main__":
    upload_folder = "../upload"
    process_and_organize_resumes(upload_folder)