import json
from typing import Dict, List, Any
from datetime import datetime as dt
import re

class ResumeScorer:
    def __init__(self):
        self.weights = {
            'skills': 0.30,
            'experience': 0.25, 
            'education': 0.20,
            'achievements': 0.15,
            'projects': 0.05,
            'cgpa': 0.05
        }

        # Add achievement scoring criteria
        self.achievement_criteria = {
            'monetary_value': {
                'regex': r'\$(\d{1,3}(?:,\d{3})*|\d+)(?:k|K)?',
                'points': lambda x: min(50, self._calculate_monetary_points(x))
            },
            'ranking': {
                'regex': r'(?:secured|achieved|won|placed|ranking|rank)\s+(?:global\s+)?(?:top[\-\s]?\d+|first|second|third|1st|2nd|3rd)',
                'points': 30
            },
            'global_competition': {
                'regex': r'global|international|world|worldwide',
                'points': 25
            },
            'founding_initiative': {
                'regex': r'found\w+|start\w+|launch\w+|establish\w+',
                'points': 35
            },
            'member_count': {
                'regex': r'(\d{1,3}(?:,\d{3})*|\d+)\s*(?:\+)?\s*(?:members?|users?|people|students?)',
                'points': lambda x: min(30, self._calculate_member_points(x))
            },
            'impact_metrics': {
                'regex': r'(?:increas\w+|reduc\w+|improv\w+|decreas\w+|sav\w+).+?(\d+)%',
                'points': lambda x: min(25, int(x) / 4)
            },
            'hackathon': {
                'regex': r'hack\w+',
                'points': 15
            }
        }

    def clean_skill_text(self, skill: str) -> str:
        # Remove common parenthetical qualifiers
        cleaned = re.sub(r'\([^)]*\)', '', skill)
        # Remove phrases indicating uncertainty
        uncertainty_phrases = [
            'not explicitly stated',
            'implied through',
            'implied by',
            'implied from',
            'specific platforms not stated',
            'not specified'
        ]
        for phrase in uncertainty_phrases:
            cleaned = cleaned.replace(phrase, '')
        return cleaned.strip()

    def calculate_skills_score(self, resume_skills: List[str], required_skills: List[str]) -> tuple:
        if not resume_skills or not required_skills:
            return 0, [], required_skills

        # Clean and process skills
        cleaned_resume_skills = [self.clean_skill_text(skill).lower() for skill in resume_skills]
        cleaned_resume_skills = [skill for skill in cleaned_resume_skills if skill]  # Remove empty strings
        
        resume_skills_str = ' '.join(cleaned_resume_skills)
        matched_skills = []
        missing_skills = []

        for skill in required_skills:
            skill_lower = skill.lower()
            # Skip if the skill contains uncertainty indicators
            if any(phrase in skill_lower for phrase in ['not explicitly', 'implied', 'not stated']):
                missing_skills.append(skill)
                continue
            
            if skill_lower in resume_skills_str:
                matched_skills.append(skill)
            else:
                missing_skills.append(skill)

        score = (len(matched_skills) / len(required_skills)) * 100
        return score, matched_skills, missing_skills

    def parse_date_range(self, experience_str: str) -> tuple:
        """Parse date range from experience string."""
        months_map = {
            'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
            'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12
        }
        
        # First check for "present" or "current"
        if any(word in experience_str.lower() for word in ['present', 'current']):
            # Find the start date
            date_pattern = r'(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* ?\d{4}'
            dates = re.findall(date_pattern, experience_str.lower())
            if dates:
                try:
                    start_month, start_year = dates[0].split()[:2]
                    start_date = dt(int(start_year), months_map[start_month[:3]], 1)
                    return start_date, dt.now()
                except (ValueError, KeyError):
                    return None, None
            return None, None

        # Extract dates using regex
        date_pattern = r'(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* ?\d{4}'
        dates = re.findall(date_pattern, experience_str.lower())
        
        if dates:
            try:
                dates = sorted(dates)
                start_month, start_year = dates[0].split()[:2]
                start_date = dt(int(start_year), months_map[start_month[:3]], 1)
                
                if len(dates) > 1:
                    end_month, end_year = dates[-1].split()[:2]
                    end_date = dt(int(end_year), months_map[end_month[:3]], 1)
                    # Add one month to end date to include the end month
                    if end_date.month == 12:
                        end_date = dt(end_date.year + 1, 1, 1)
                    else:
                        end_date = dt(end_date.year, end_date.month + 1, 1)
                else:
                    # If only one date is found, assume it's a one-month experience
                    if start_date.month == 12:
                        end_date = dt(start_date.year + 1, 1, 1)
                    else:
                        end_date = dt(start_date.year, start_date.month + 1, 1)
                
                return start_date, end_date
            except (ValueError, KeyError):
                return None, None

        years_pattern = r'(\d+)\+?\s*(?:year|yr)'
        months_pattern = r'(\d+)\s*month'
        
        years_match = re.search(years_pattern, experience_str.lower())
        months_match = re.search(months_pattern, experience_str.lower())
        
        if years_match or months_match:
            total_months = 0
            if years_match:
                total_months += int(years_match.group(1)) * 12
            if months_match:
                total_months += int(months_match.group(1))
            
            end_date = dt.now()
            try:
                # Calculate start date by subtracting months manually
                year_diff = total_months // 12
                month_diff = total_months % 12
                
                new_year = end_date.year - year_diff
                new_month = end_date.month - month_diff
                
                # Adjust for negative months
                if new_month <= 0:
                    new_month += 12
                    new_year -= 1
                
                start_date = dt(new_year, new_month, 1)
                return start_date, end_date
            except ValueError:
                return None, None

        return None, None

    def calculate_experience_duration(self, start_date: dt, end_date: dt) -> float:
        """Calculate duration between two dates in years."""
        if not start_date or not end_date:
            return 0.0
        
        # Ensure end_date is not in the future
        current_date = dt.now()
        end_date = min(end_date, current_date)
        
        # Ensure start_date is not after end_date
        if start_date > end_date:
            start_date, end_date = end_date, start_date
            
        difference = end_date - start_date
        years = difference.days / 365.25  # More precise year calculation
        return max(0, years)  # Ensure non-negative duration

    def calculate_experience_duration(self, start_date: dt, end_date: dt) -> float:
        if not start_date or not end_date:
            return 0.0
        
        difference = end_date - start_date
        return difference.days / 365.25  # More precise year calculation

    def calculate_experience_score(self, experience: List[str], required_years: float) -> tuple:
        """Calculate experience score and total years."""
        if not experience:
            return 0, 0

        total_years = 0
        for exp in experience:
            try:
                start_date, end_date = self.parse_date_range(exp)
                if start_date and end_date:
                    duration = self.calculate_experience_duration(start_date, end_date)
                    total_years += duration
                else:
                    # Fallback for unparseable entries - assume 3 months
                    total_years += 0.25
            except Exception as e:
                # Fallback in case of any parsing errors
                total_years += 0.25  # Conservative estimate of 3 months
                continue

        # Ensure non-negative total years
        total_years = max(0, total_years)
        
        # Calculate score
        if required_years <= 0:
            score = 100 if total_years > 0 else 0
        else:
            score = min(100, (total_years / required_years) * 100)
        
        return score, round(total_years, 2)

    def calculate_education_score(self, education: List[str], required_education: str) -> float:
        if not education:
            return 0

        education_str = ' '.join(education).lower()
        required_education = required_education.lower()

        if "bachelor" in required_education and "bachelor" in education_str:
            return 100
        elif "master" in required_education and "master" in education_str:
            return 100
        elif "phd" in required_education and "phd" in education_str:
            return 100
            
        return 50


    def _calculate_monetary_points(self, value_str):
        """Calculate points based on monetary value"""
        try:
            # Remove '$' and ',' from string and convert 'k' or 'K' to actual value
            value_str = value_str.replace('$', '').replace(',', '')
            if 'k' in value_str.lower():
                value = float(value_str.lower().replace('k', '')) * 1000
            else:
                value = float(value_str)
            
            # Logarithmic scoring: more points for higher values but with diminishing returns
            return min(50, (10 * (1 + value / 1000)))
        except ValueError:
            return 5

    def _calculate_member_points(self, count_str):
        """Calculate points based on member count"""
        try:
            count = int(count_str.replace(',', ''))
            # Logarithmic scoring: more points for higher counts but with diminishing returns
            return min(30, (5 * (1 + count / 1000)))
        except ValueError:
            return 5

    def analyze_achievement(self, achievement: str) -> dict:
        """Analyze a single achievement and return its score and features"""
        score = 0
        features = []
        
        for criterion_name, criterion in self.achievement_criteria.items():
            matches = re.finditer(criterion['regex'], achievement.lower())
            for match in matches:
                if callable(criterion['points']):
                    # For criteria with dynamic scoring (like monetary values)
                    value = match.group(1) if match.groups() else match.group(0)
                    points = criterion['points'](value)
                else:
                    # For criteria with fixed scoring
                    points = criterion['points']
                
                score += points
                features.append(f"{criterion_name}: {match.group(0)}")
        
        return {
            'score': min(100, score),  # Cap score at 100
            'features': features,
            'text': achievement
        }
    
    def calculate_achievements_score(self, achievements: List[str]) -> tuple:
        if not achievements:
            return 0, []
        
        analyzed_achievements = []
        total_score = 0
        
        for achievement in achievements:
            analysis = self.analyze_achievement(achievement)
            analyzed_achievements.append(analysis)
            total_score += analysis['score']
        
        # Calculate final score
        if analyzed_achievements:
            # Average score across all achievements, weighted by completeness
            avg_score = total_score / len(analyzed_achievements)
            # Bonus for having multiple strong achievements
            quantity_bonus = min(20, len(analyzed_achievements) * 5)
            final_score = min(100, avg_score + quantity_bonus)
        else:
            final_score = 0
        
        # Sort achievements by score for reporting
        analyzed_achievements.sort(key=lambda x: x['score'], reverse=True)
        
        return final_score, analyzed_achievements

    def calculate_projects_score(self, projects: List[str]) -> tuple:
        if not projects:
            return 0, []

        relevant_projects = [proj for proj in projects if isinstance(proj, str) and len(proj) > 20]
        score = min(100, 40 * len(relevant_projects))
        return score, relevant_projects

    def calculate_cgpa_score(self, cgpa: float, required_cgpa: float) -> tuple:
        if not cgpa:
            return 0, None

        if cgpa >= required_cgpa:
            score = 100
        else:
            score = (cgpa / required_cgpa) * 100

        return min(score, 100), cgpa

    def format_report(self, name: str, scores: Dict, job_requirements: Dict) -> str:
        output = [f"\nResults for {name}:"]
        
        # Skills Assessment
        skills_data = scores['scores']['skills']
        output.append("Skills Assessment")
        output.append(f"Matched {len(skills_data['matched'])}/{len(skills_data['matched']) + len(skills_data['missing'])} key skills: {', '.join(skills_data['matched'])}")
        if skills_data['missing']:
            output.append(f"Missing skills: {', '.join(skills_data['missing'])}")
        output.append(f"Score: {skills_data['score']:.0f}%")
        
        # Experience Assessment
        exp_data = scores['scores']['experience']
        output.append("\nExperience Assessment")
        output.append(f"Required: {job_requirements['required_experience']}+ years in software development")
        output.append(f"Found: {exp_data['years']:.1f} years")
        output.append(f"Score: {exp_data['score']:.0f}%")
        
        # Education Assessment
        edu_data = scores['scores']['education']
        output.append("\nEducation Assessment")
        output.append(f"Required: {job_requirements['required_education']}")
        output.append(f"Score: {edu_data['score']:.0f}%")
        
        # CGPA Assessment
        cgpa_data = scores['scores']['cgpa']
        output.append("\nCGPA Assessment")
        output.append(f"Required: {job_requirements['required_cgpa']}/10.0")
        if cgpa_data['found']:
            output.append(f"Found: {cgpa_data['found']}")
        output.append(f"Score: {cgpa_data['score']:.0f}%")
        
        # Achievements Assessment
        # Enhanced Achievements Assessment
        achieve_data = scores['scores']['achievements']
        output.append("\nAchievements Assessment")
        if achieve_data['found']:
            output.append(f"Found {len(achieve_data['found'])} achievements:")
            for achievement in achieve_data['found']:
                output.append(f"\n- Achievement: {achievement['text']}")
                output.append(f"  Score: {achievement['score']:.0f}/100")
                if achievement['features']:
                    output.append(f"  Notable elements: {', '.join(achievement['features'])}")
        output.append(f"\nOverall Achievement Score: {achieve_data['score']:.0f}%")
        
        # Projects Assessment
        proj_data = scores['scores']['projects']
        output.append("\nProjects Assessment")
        output.append(f"Found {len(proj_data['found'])} relevant projects:")
        if proj_data['found']:
            for project in proj_data['found']:
                output.append(f"- {project}")
        output.append(f"Score: {proj_data['score']:.0f}%")
        
        # Overall Score
        output.append(f"\nOverall ATS Score: {scores['overall_score']:.0f}%")
        
        return "\n".join(output)

    def evaluate_resume(self, resume_data: Dict[str, Any], job_requirements: Dict[str, Any]) -> Dict[str, Any]:
        scores = {}
        
        skills_score, matched_skills, missing_skills = self.calculate_skills_score(
            resume_data.get('skills', []),
            job_requirements.get('required_skills', [])
        )
        scores['skills'] = {'score': skills_score, 'matched': matched_skills, 'missing': missing_skills}
        
        exp_score, years = self.calculate_experience_score(
            resume_data.get('experience', []),
            job_requirements.get('required_experience', 0)
        )
        scores['experience'] = {'score': exp_score, 'years': years}
        
        edu_score = self.calculate_education_score(
            resume_data.get('education', []),
            job_requirements.get('required_education', '')
        )
        scores['education'] = {'score': edu_score}
        
        achieve_score, achievements = self.calculate_achievements_score(
            resume_data.get('achievements', [])
        )
        scores['achievements'] = {'score': achieve_score, 'found': achievements}
        
        proj_score, projects = self.calculate_projects_score(
            resume_data.get('projects', [])
        )
        scores['projects'] = {'score': proj_score, 'found': projects}
        
        cgpa_score, found_cgpa = self.calculate_cgpa_score(
            resume_data.get('cgpa', 0),
            job_requirements.get('required_cgpa', 0)
        )
        scores['cgpa'] = {'score': cgpa_score, 'found': found_cgpa}
        
        overall_score = sum(
            scores[category]['score'] * self.weights[category]
            for category in self.weights.keys()
        )
        
        return {
            'scores': scores,
            'overall_score': overall_score
        }

def main():
    with open('organized_resumes_by_name.json', 'r') as f:
        resumes = json.load(f)
    
    job_requirements = {
        'required_skills': ['Python', 'Java', 'SQL', 'Machine Learning', 'Cloud Computing'],
        'required_experience': 0.6,
        'required_education': 'bachelor of technology',
        'required_cgpa': 9.0
    }
    
    scorer = ResumeScorer()
    
    for name, resume in resumes.items():
        report = scorer.evaluate_resume(resume, job_requirements)
        print(scorer.format_report(name, report, job_requirements))
        print("\n" + "="*50)

if __name__ == "__main__":
    main()