import React, { useState, useEffect } from 'react';

// Main App Component
export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('resume');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [certificationSubmitted, setCertificationSubmitted] = useState(false);

  // Resume State (ATS-friendly data structure)
  const [resume, setResume] = useState({
    fullName: 'John Doe',
    title: 'Aspiring Software Developer',
    email: 'john.doe@techprep.edu',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/johndoe',
    summary: 'Dedicated computer science student with a strong foundation in full-stack web development and a passion for creating scalable, efficient applications. Seeking an internship to apply technical skills in a challenging environment.',
    education: [
      { institution: 'State University', degree: 'B.S. Computer Science', duration: '2022 - 2026', details: 'GPA: 3.8/4.0' }
    ],
    experience: [
      { company: 'Tech Prep Solutions', position: 'Web Dev Intern', duration: 'Summer 2024', description: 'Developed a responsive inventory tracking module using React and Tailwind CSS, resulting in a 20% improvement in load time.' }
    ],
    skills: ['JavaScript', 'React', 'Python', 'SQL', 'Git', 'Tailwind CSS', 'Agile Methodology']
  });

  // Certification State
  const [certification, setCertification] = useState({
    name: '',
    course: '',
    completionDate: ''
  });

  // Grades State
  const [grades] = useState([
    { assignmentName: 'Final Project: E-commerce Site', submissionDate: '2024-05-15', grade: 'A+', feedback: 'Exceptional system architecture and clean, modular code.' },
    { assignmentName: 'Midterm Exam: Algorithms', submissionDate: '2024-03-20', grade: 'A', feedback: 'Mastery of Big O notation and sorting algorithms.' },
    { assignmentName: 'Quiz: Data Structures Basics', submissionDate: '2024-02-10', grade: 'B+', feedback: 'Good understanding, review hash map complexity.' }
  ]);

  // Handler for Resume fields
  const handleResumeChange = (section, index, field, value) => {
    const updated = { ...resume };

    if (section === 'skills') {
      // Handles skills comma-separated input
      updated.skills = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    } else if (index !== undefined) {
      // Handles nested arrays (experience, education)
      updated[section][index][field] = value;
    } else {
      // Handles top-level fields (fullName, summary, etc.)
      updated[section] = value;
    }
    setResume(updated);
  };
  
  // Handler to add a new Experience entry
  const handleAddExperience = () => {
      setResume(prevResume => ({
          ...prevResume,
          experience: [
              ...prevResume.experience,
              { company: '', position: '', duration: '', description: '' }
          ]
      }));
  };

  // Handler to add a new Education entry
  const handleAddEducation = () => {
      setResume(prevResume => ({
          ...prevResume,
          education: [
              ...prevResume.education,
              { institution: '', degree: '', duration: '', details: '' }
          ]
      }));
  };

  // Handler to remove an entry from any section (experience or education)
  const handleRemoveEntry = (section, index) => {
      setResume(prevResume => ({
          ...prevResume,
          [section]: prevResume[section].filter((_, i) => i !== index)
      }));
  };

  // Function to simulate PDF download/print (ATS-friendly format)
  const downloadResumePDF = () => {
    const element = document.getElementById('resume-preview');
    // We create a temporary print window to ensure clean printing of only the resume content
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Resume - ' + resume.fullName + '</title>');
    // Include Tailwind's basic reset for print view and ATS-friendly styling
    printWindow.document.write('<style>body { font-family: Inter, sans-serif; margin: 0; padding: 0; } .ats-resume { padding: 3rem; max-width: 8.5in; margin: 0 auto; } .section-title { border-bottom: 2px solid #374151; padding-bottom: 0.25rem; margin-top: 1rem; margin-bottom: 0.75rem; font-size: 1.25rem; font-weight: 700; color: #1f2937; } .job-title { font-weight: 700; color: #1f2937; } .job-details { font-style: italic; color: #4b5563; font-size: 0.875rem; } .job-description-list { list-style-type: disc; margin-left: 1.5rem; font-size: 0.875rem; color: #374151; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(element.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  // Handler for Certification Submission
  const handleCertificationSubmit = () => {
    if (certification.name && certification.course && certification.completionDate) {
      // Simulate API call success
      setShowConfetti(true);
      setCertificationSubmitted(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      // Use custom message box instead of alert()
      alert('Please fill out all fields before submitting.');
    }
  };
  
  // Custom message box function (used as a fallback for alerts)
  const alert = (message) => {
    const modal = document.createElement('div');
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50";
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm text-center">
        <h3 class="text-xl font-bold text-red-600 mb-4">Error</h3>
        <p class="text-gray-700 mb-6">${message}</p>
        <button id="close-modal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">OK</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('close-modal').onclick = () => document.body.removeChild(modal);
  };


  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-xl`}>
        <div className="p-4 flex items-center justify-between h-16 border-b border-gray-800">
          {sidebarOpen && <h1 className="text-xl font-extrabold text-blue-400">Student Hub</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-700 rounded-full transition text-2xl">
            {sidebarOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>}
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4 pt-6">
          <TabButton icon="📄" label="Resume Builder" currentTab="resume" activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />
          <TabButton icon="🏆" label="Certification" currentTab="certification" activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />
          <TabButton icon="📊" label="Grades" currentTab="grades" activeTab={activeTab} setActiveTab={setActiveTab} sidebarOpen={sidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          
          {/* Resume Builder Tab Content */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">Resume Builder</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Editor Panel */}
                <div className="bg-white p-6 rounded-xl shadow-lg space-y-6 lg:max-h-[80vh] overflow-y-auto order-2 lg:order-1">
                  <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">Edit Your Details</h3>
                  
                  {/* Personal Info */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={resume.fullName}
                      onChange={(e) => handleResumeChange('fullName', undefined, '', e.target.value)}
                      className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="Your Full Name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="Job Title/Role" type="text" value={resume.title} onChange={(e) => handleResumeChange('title', undefined, '', e.target.value)} placeholder="e.g., Aspiring Software Developer" />
                    <InputField label="Email" type="email" value={resume.email} onChange={(e) => handleResumeChange('email', undefined, '', e.target.value)} placeholder="email@example.com" />
                    <InputField label="Phone" type="tel" value={resume.phone} onChange={(e) => handleResumeChange('phone', undefined, '', e.target.value)} placeholder="+1 (555) 123-4567" />
                    <InputField label="LinkedIn URL" type="text" value={resume.linkedin} onChange={(e) => handleResumeChange('linkedin', undefined, '', e.target.value)} placeholder="linkedin.com/in/..." />
                  </div>

                  {/* Summary */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary</label>
                    <textarea
                      value={resume.summary}
                      onChange={(e) => handleResumeChange('summary', undefined, '', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 transition"
                      placeholder="A concise summary of your skills and goals."
                    />
                  </div>

                  {/* Experience Editor */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Experience</h3>
                    {resume.experience.map((exp, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
                        <InputField type="text" placeholder="Company" value={exp.company} onChange={(e) => handleResumeChange('experience', idx, 'company', e.target.value)} label="Company" />
                        <InputField type="text" placeholder="Position" value={exp.position} onChange={(e) => handleResumeChange('experience', idx, 'position', e.target.value)} label="Position" />
                        <InputField type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleResumeChange('experience', idx, 'duration', e.target.value)} label="Duration" />
                        <label className="block text-sm font-medium text-gray-700 mt-2 mb-1">Description (Use line breaks for bullet points)</label>
                        <textarea
                          placeholder="Project details, achievements, quantified results. (Use line breaks for bullet points)"
                          value={exp.description}
                          onChange={(e) => handleResumeChange('experience', idx, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button
                          onClick={() => handleRemoveEntry('experience', idx)}
                          className="mt-2 text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          Remove Entry
                        </button>
                      </div>
                    ))}
                    
                    {/* Add Experience Button */}
                    <button
                        onClick={handleAddExperience}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition text-sm flex items-center justify-center gap-2 mt-2"
                    >
                        + Add Experience Entry
                    </button>
                  </div>

                  {/* Education Editor */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Education</h3>
                    {resume.education.map((edu, idx) => (
                        <div key={idx} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-4">
                            <InputField type="text" placeholder="Institution Name" value={edu.institution} onChange={(e) => handleResumeChange('education', idx, 'institution', e.target.value)} label="Institution" />
                            <InputField type="text" placeholder="Degree/Certificate" value={edu.degree} onChange={(e) => handleResumeChange('education', idx, 'degree', e.target.value)} label="Degree/Certificate" />
                            <InputField type="text" placeholder="Duration (e.g., 2022 - 2026)" value={edu.duration} onChange={(e) => handleResumeChange('education', idx, 'duration', e.target.value)} label="Duration" />
                            <InputField type="text" placeholder="Details (e.g., GPA 3.8, Honors)" value={edu.details} onChange={(e) => handleResumeChange('education', idx, 'details', e.target.value)} label="Details" />
                            <button
                                onClick={() => handleRemoveEntry('education', idx)}
                                className="mt-2 text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Remove Entry
                            </button>
                        </div>
                    ))}
                    {/* Add Education Button */}
                    <button
                        onClick={handleAddEducation}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition text-sm flex items-center justify-center gap-2 mt-2"
                    >
                        + Add Education Entry
                    </button>
                  </div>
                  
                  {/* Skills Editor */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 mt-6">Skills (Comma Separated)</label>
                    <textarea
                      value={resume.skills.join(', ')}
                      onChange={(e) => handleResumeChange('skills', undefined, '', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-16 transition"
                      placeholder="e.g., JavaScript, React, Python, Tailwind CSS"
                    />
                  </div>
                </div>

                {/* Preview Panel */}
                <div className="lg:max-h-[80vh] overflow-y-auto order-1 lg:order-2">
                  <div className="bg-white p-8 rounded-xl shadow-2xl sticky top-0 border-4 border-gray-100">
                    <div id="resume-preview" className="ats-resume bg-white p-2 text-gray-800">
                      
                      {/* Header */}
                      <div className="text-center mb-6 pb-2 border-b-4 border-gray-800">
                        <h1 className="text-3xl font-extrabold tracking-wider uppercase text-gray-900">{resume.fullName}</h1>
                        <p className="text-lg font-medium text-gray-600 mb-2">{resume.title}</p>
                        <p className="text-sm text-gray-600 space-x-4">
                          <span>{resume.email}</span>
                          <span>|</span>
                          <span>{resume.phone}</span>
                          <span>|</span>
                          <a href={`https://${resume.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">{resume.linkedin}</a>
                        </p>
                      </div>

                      {/* Summary */}
                      <Section title="Professional Summary">
                        <p className="text-sm leading-relaxed">{resume.summary}</p>
                      </Section>
                      
                      {/* Skills */}
                      <Section title="Technical Skills">
                        <p className="text-sm font-medium">
                          <span className="font-bold mr-2">Skills:</span> {resume.skills.join(' | ')}
                        </p>
                      </Section>
                      
                      {/* Experience */}
                      <Section title="Experience">
                        {resume.experience.map((exp, idx) => (
                          <div key={idx} className="mb-4">
                            <div className="flex justify-between items-baseline">
                              <p className="job-title text-base font-bold text-gray-900">{exp.position} at {exp.company}</p>
                              <p className="job-details text-sm italic text-gray-600">{exp.duration}</p>
                            </div>
                            <ul className="job-description-list mt-1 list-disc ml-5 text-sm text-gray-700 space-y-1">
                              {/* Use line breaks to create list items for ATS */}
                              {exp.description.split('\n').map((line, i) => (
                                line.trim() && <li key={i}>{line}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Section>
                      
                      {/* Education */}
                      <Section title="Education">
                        {resume.education.map((edu, idx) => (
                          <div key={idx} className="mb-3">
                            <div className="flex justify-between items-baseline">
                                <p className="font-bold text-gray-900 text-base">{edu.degree} - {edu.institution}</p>
                                <p className="text-sm italic text-gray-600">{edu.duration}</p>
                            </div>
                            <p className="text-sm text-gray-700">{edu.details}</p>
                          </div>
                        ))}
                      </Section>

                    </div>

                    <button
                      onClick={downloadResumePDF}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center gap-3 text-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                      Download / Print ATS Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Certification Tab Content */}
          {activeTab === 'certification' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">Certification Submission</h2>

              {!certificationSubmitted ? (
                <div className="bg-white p-8 rounded-xl shadow-2xl space-y-6 border border-blue-200">
                  <p className="text-gray-600 text-center mb-4">Please submit your details to receive your official course completion certificate.</p>
                  
                  <InputField label="Full Name (as it should appear on certificate)" type="text" value={certification.name} onChange={(e) => setCertification({ ...certification, name: e.target.value })} placeholder="Your Full Legal Name" />
                  <InputField label="Course Name (Completed)" type="text" value={certification.course} onChange={(e) => setCertification({ ...certification, course: e.target.value })} placeholder="e.g., Advanced JavaScript Development" />
                  <InputField label="Date of Completion" type="date" value={certification.completionDate} onChange={(e) => setCertification({ ...certification, completionDate: e.target.value })} />
                  
                  <button
                    onClick={handleCertificationSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg mt-4 disabled:bg-gray-400"
                    disabled={!certification.name || !certification.course || !certification.completionDate}
                  >
                    Submit for Certificate
                  </button>
                </div>
              ) : (
                <ConfettiSuccessMessage certification={certification} setCertificationSubmitted={setCertificationSubmitted} setCertification={setCertification} showConfetti={showConfetti} />
              )}
            </div>
          )}

          {/* Grades Tab Content */}
          {activeTab === 'grades' && (
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-8 border-b pb-2">Your Grades & Feedback</h2>

              <div className="grid gap-6">
                {grades.map((grade, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-l-4 border-blue-500">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{grade.assignmentName}</h3>
                      <div className={`text-4xl font-extrabold px-4 py-1 rounded-lg shadow-inner ${grade.grade.startsWith('A') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {grade.grade}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <p><span className="font-semibold text-gray-700">Submission Date:</span> {new Date(grade.submissionDate).toLocaleDateString()}</p>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="font-semibold text-gray-700">Teacher Feedback:</p>
                      <p className="text-gray-700 text-sm italic mt-1">{grade.feedback}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confetti Animation CSS */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// --- Helper Components ---

// Reusable Tab Button for Sidebar
const TabButton = ({ icon, label, currentTab, activeTab, setActiveTab, sidebarOpen }) => (
  <button
    onClick={() => setActiveTab(currentTab)}
    className={`w-full flex items-center gap-3 p-3 rounded-xl transition duration-200 ${
      activeTab === currentTab ? 'bg-blue-600 shadow-md text-white' : 'hover:bg-gray-800 text-gray-300'
    }`}
  >
    <span className="text-2xl">{icon}</span>
    {sidebarOpen && <span className="text-sm font-medium">{label}</span>}
  </button>
);

// Reusable Input Field
const InputField = ({ label, type, value, onChange, placeholder = '' }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-700 mt-2 mb-1">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder={placeholder}
        />
    </div>
);

// Reusable Resume Section
const Section = ({ title, children }) => (
  <div className="mb-4">
    <h2 className="section-title text-xl font-bold text-gray-800 uppercase tracking-wider mb-2">{title}</h2>
    {children}
  </div>
);

// Success/Confetti Modal for Certification
const ConfettiSuccessMessage = ({ certification, setCertificationSubmitted, setCertification, showConfetti }) => (
    <div className="relative">
        {showConfetti && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-3xl font-bold"
                        style={{
                            left: Math.random() * 100 + '%',
                            top: -20,
                            animation: `fall ${Math.random() * 2 + 3}s cubic-bezier(0.1, 0.9, 0.2, 1) forwards`,
                            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                            fontSize: `${Math.random() * 1.5 + 1}rem`,
                            zIndex: 41,
                            opacity: 0,
                            animationDelay: `${Math.random() * 0.5}s`,
                        }}
                    >
                        {['🎉', '⭐', '🏆', '✨', '🎈'][Math.floor(Math.random() * 5)]}
                    </div>
                ))}
            </div>
        )}

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 rounded-xl shadow-2xl text-center space-y-4 text-white">
            <div className="text-7xl mb-4 animate-bounce">🏆</div>
            <h3 className="text-4xl font-extrabold tracking-tight">Congratulations!</h3>
            <p className="text-lg font-light">
                You successfully submitted your completion for the course: <span className="font-semibold italic">{certification.course}</span>.
            </p>
            <p className="text-sm">
                Your official certificate will be printed and digitally issued to **{certification.name}** within **7 days**.
            </p>
            <div className="pt-4 text-xs text-blue-200">
                A confirmation email is on its way to your registered email address.
            </div>
            <button
                onClick={() => {
                    setCertificationSubmitted(false);
                    setCertification({ name: '', course: '', completionDate: '' });
                }}
                className="mt-6 bg-white text-blue-600 hover:text-indigo-800 font-bold py-3 px-8 rounded-full transition shadow-lg hover:shadow-xl duration-300 transform hover:scale-105"
            >
                Submit Another Certification
            </button>
        </div>
    </div>
);
