"use client";
import { useState, type FormEvent, useRef, KeyboardEvent, ChangeEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userType, setUserType] = useState<"hiringManager" | "jobSeeker">("hiringManager");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  
  // States for tag-based inputs
  const [hiringPositions, setHiringPositions] = useState<string[]>([]);
  const [currentHiringPosition, setCurrentHiringPosition] = useState<string>("");
  
  const [roles, setRoles] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState<string>("");
  
  // Radio button state for hiring type
  const [hiringType, setHiringType] = useState<"contractor" | "permanent" | "both">("both");
  
  // State for nationality dropdown
  const [nationality, setNationality] = useState<string>("");
  
  // List of countries for the nationality dropdown
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
  ];

  // Handler for tag input fields (both hiring positions and roles)
  const handleTagKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    currentValue: string,
    setCurrentValue: React.Dispatch<React.SetStateAction<string>>,
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    // Add tag on Enter or comma
    if ((e.key === 'Enter' || e.key === ',') && currentValue.trim()) {
      e.preventDefault();
      // Prevent adding duplicate tags
      if (!tags.includes(currentValue.trim())) {
        setTags([...tags, currentValue.trim()]);
      }
      setCurrentValue('');
    }
    // Remove last tag on Backspace if input is empty
    else if (e.key === 'Backspace' && !currentValue && tags.length > 0) {
      e.preventDefault();
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  // Handler for removing a specific tag by clicking on it
  const removeTag = (
    indexToRemove: number,
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  // Convenience handlers for specific tag inputs
  const handleHiringPositionKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    handleTagKeyDown(e, currentHiringPosition, setCurrentHiringPosition, hiringPositions, setHiringPositions);
  };

  const handleRoleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    handleTagKeyDown(e, currentRole, setCurrentRole, roles, setRoles);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      userType,
      hiringPositions: userType === 'hiringManager' ? hiringPositions : [],
      roles: userType === 'jobSeeker' ? roles : [],
      hiringType: userType === 'hiringManager' ? hiringType : null,
      nationality: userType === 'jobSeeker' ? nationality : ''
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  return (
    <div
      className="relative w-full py-6 md:py-8 lg:py-10 flex flex-col items-center justify-center bg-gray-50"
      id="contactus"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30vw] -right-[10vw] w-[70vw] h-[70vw] bg-primary/5 rounded-full"></div>
        <div className="absolute -bottom-[20vw] -left-[10vw] w-[50vw] h-[50vw] bg-primary/5 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Form heading */}
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Get in touch
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Explore how we can support your business through innovative IT solutions.
          </p>
        </div>

        {/* Form */}
        <div className="bg-warm-white shadow-xl rounded-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-3 sm:p-4">
            {/* User type toggle */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 text-center mb-2">I am a:</label>
              <div className="relative bg-gray-100 p-1.5 rounded-full max-w-md mx-auto flex">
                <button
                  type="button"
                  onClick={() => setUserType("hiringManager")}
                  className={`relative z-10 flex-1 px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center justify-center gap-1.5 ${userType === "hiringManager" ? "text-white" : "text-gray-600 hover:text-gray-900"}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Hiring Manager
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("jobSeeker")}
                  className={`relative z-10 flex-1 px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full flex items-center justify-center gap-1.5 ${userType === "jobSeeker" ? "text-white" : "text-gray-600 hover:text-gray-900"}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Job Seeker
                </button>
                {/* Sliding background for active state - updated with nicer colors */}
                <div 
                  className={`absolute top-1.5 h-[calc(100%-12px)] transition-all duration-300 ease-in-out rounded-full ${userType === "hiringManager" ? "left-1.5 w-[calc(50%-6px)] bg-gradient-to-r from-blue-500 to-purple-500" : "left-[calc(50%+3px)] w-[calc(50%-6px)] bg-gradient-to-r from-green-500 to-teal-400"}`} 
                  style={{ boxShadow: "0 2px 8px rgba(66, 153, 225, 0.5)" }}
                ></div>
              </div>
            </div>

            {/* Conditional form fields based on user type */}
            {userType === "hiringManager" ? (
              <>
                {/* Hiring Manager Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                    />
                  </div>
                  
                  {/* Organization Name */}
                  <div>
                    <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700 mb-1">
                      Organization Name
                    </label>
                    <input
                      id="organizationName"
                      type="text"
                      placeholder="Your company name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>
                
                {/* Organization Website */}
                <div className="mt-4">
                  <label htmlFor="organizationWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Website
                  </label>
                  <input
                    id="organizationWebsite"
                    type="url"
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                
                {/* Hiring Positions - Tag Input */}
                <div className="mt-4">
                  <label htmlFor="hiringPositions" className="block text-sm font-medium text-gray-700 mb-1">
                    Hiring Positions
                  </label>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg mb-1 min-h-[52px]">
                      {hiringPositions.map((position, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
                        >
                          {position}
                          <button 
                            type="button" 
                            onClick={() => removeTag(index, hiringPositions, setHiringPositions)}
                            className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        id="hiringPositions"
                        placeholder={hiringPositions.length ? "" : "Add positions and press Enter..."}
                        value={currentHiringPosition}
                        onChange={(e) => setCurrentHiringPosition(e.target.value)}
                        onKeyDown={handleHiringPositionKeyDown}
                        className="flex-grow bg-transparent border-none outline-none min-w-[120px] p-1 text-sm"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Press Enter or comma to add a position</p>
                  </div>
                </div>
                
                {/* Hiring Type - Radio Buttons */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hiring for
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="hiringType" 
                        value="contractor" 
                        checked={hiringType === "contractor"}
                        onChange={() => setHiringType("contractor")}
                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2 text-sm text-gray-700">Contractor</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="hiringType" 
                        value="permanent" 
                        checked={hiringType === "permanent"}
                        onChange={() => setHiringType("permanent")}
                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2 text-sm text-gray-700">Permanent</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="hiringType" 
                        value="both" 
                        checked={hiringType === "both"}
                        onChange={() => setHiringType("both")}
                        className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2 text-sm text-gray-700">Both</span>
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Job Seeker Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      required
                    />
                  </div>
                  
                  {/* Nationality Dropdown */}
                  <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <select
                      id="nationality"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                    >
                      <option value="">Select your nationality</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Roles - Tag Input */}
                <div className="mt-4">
                  <label htmlFor="roles" className="block text-sm font-medium text-gray-700 mb-1">
                    Roles You're Interested In
                  </label>
                  <div className="relative">
                    <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-200 rounded-lg mb-1 min-h-[52px]">
                      {roles.map((role, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center bg-teal-100 text-teal-800 px-2 py-1 rounded-md text-sm"
                        >
                          {role}
                          <button 
                            type="button" 
                            onClick={() => removeTag(index, roles, setRoles)}
                            className="ml-1 text-teal-500 hover:text-teal-700 focus:outline-none"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        id="roles"
                        placeholder={roles.length ? "" : "Add roles and press Enter..."}
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                        onKeyDown={handleRoleKeyDown}
                        className="flex-grow bg-transparent border-none outline-none min-w-[120px] p-1 text-sm"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Press Enter or comma to add a role</p>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="mt-4">
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter (optional)
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={4}
                    placeholder="Tell us about yourself and why you're interested..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>

                {/* File Upload */}
                <div className="mt-4">
                  <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Resume/CV
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label 
                      htmlFor="resume" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-1 text-sm text-gray-500 text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 text-center">PDF, DOCX or RTF (MAX. 5MB)</p>
                      </div>
                      <input id="resume" type="file" className="hidden" accept=".pdf,.docx,.rtf" />
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Email input */}
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Phone input */}
            <div className="mt-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Notes / Description */}
            <div className="mt-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Write a note
              </label>
              <textarea
                id="notes"
                rows={3}
                placeholder="Tell us about your project or requirements..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
              ></textarea>
            </div>

            {/* File Attachment */}
            <div className="mt-4">
              <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-1">
                Attach documents (optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="attachment"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 text-gray-700 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M17 8L12 3M12 3L7 8M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Choose file
                  </button>
                  {fileName && (
                    <span className="ml-3 text-sm text-gray-600 truncate max-w-xs">{fileName}</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX or TXT (max 5MB)</p>
              </div>
            </div>

            {/* Security message */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Your data is secure with us. We never share your information with third parties.</span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full bg-gradient-to-r from-primary to-purple-600 text-white py-3 px-6 rounded-lg transition-all font-medium text-base focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 border border-transparent hover:bg-gradient-to-r hover:from-primary/90 hover:to-purple-500 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              data-component-name="ContactForm"
            >
              {loading ? (
                <>
                  <span className="animate-pulse">Sending...</span>
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  Get In Touch
                  <Send size={18} className="ml-1" />
                </>
              )}
            </button>
            
            {/* Success message */}
            {showSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 flex-shrink-0 mt-0.5">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Thank you for your message! We'll get back to you as soon as possible.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
