import React, { useState, useMemo } from 'react';
import FormInput from '../components/FormInput'; // Custom input component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUniversity,
  faMapMarkerAlt,
  faPhone,
  faBook,
  faImage,
  faUserShield,
  faInfoCircle,
  faSpinner,
  faUpload,
  faTimes,
  faBriefcase,
  faUsers,
  faAward,
  faGlobe,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

const UniversityRegister = () => {
  // State to store form data (all input fields)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    ownership: '',
    accreditation: '',
    affiliation: '',
    established: '',
    website: '',
    headOfficeAddress: '',
    address: '', // Campus address
    city: '',
    state: '',
    pincode: '',
    altContact: { countryCode: '+91', phone: '' },
    contacts: [{ type: 'chancellor', name: '', email: '', phone: '', countryCode: '+91', linkedin: '', photo: null }],
    coursesFile: null,
    courses: [{ name: '', level: '', specialization: '', duration: '', mode: '', eligibility: '', admissionProcess: '', seats: '', fees: '', scholarships: '', placementOptions: '' }],
    streams: '',
    students: '',
    faculty: '',
    hostel: '',
    campusArea: '',
    facilities: { library: '', labs: '', researchCenters: '', sports: '', cafeteria: '', auditorium: '', medical: '', transport: '', itFacilities: '' },
    about: '',
    logo: null,
    brochure: null,
    images: [],
    videos: [],
    socialMedia: { facebook: '', twitter: '', instagram: '', linkedin: '', youtube: '' },
    adminEmail: '',
    password: '',
    confirmPassword: '',
    placementRate: '',
    topRecruiters: '',
    averagePackage: '',
    highestPackage: '',
    placementCellContactEmail: '',
    internshipTieUps: '',
    alumniInIndustry: '',
    rankings: '',
    awards: '',
    notableAlumni: '',
    mediaCoverage: '',
    intlStudentOffice: '',
    countriesEnrolled: '',
    foreignMoUs: '',
    languageSupport: '',
    visaSupport: '',
    accreditationDocs: [],
    affiliationDocs: [],
    registrationDocs: [],
    seal: null,
    subscriptionPlan: 'free',
    declaration: false,
  });

  // State for current step
  const [currentStep, setCurrentStep] = useState(1);

  // State for form errors and submission status
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for previewing uploaded images and videos
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  // Lists for dropdown menus
  const universityTypes = ['Government', 'Private', 'Deemed', 'Central', 'State'];
  const ownershipTypes = ['Public', 'Private', 'Other'];
  const affiliations = ['UGC', 'AICTE', 'NAAC', 'ICAR', 'BCI', 'MCI', 'Others'];
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];
  const countryCodes = ['+91', '+1', '+44', '+61', '+81', '+86', '+971'];
  const contactTypes = ['Chancellor', 'Vice Chancellor', 'Registrar', 'Deans', 'Principal', 'Admission Officer', 'Placement Officer', 'Research Head', 'Intl. Relations Officer', 'Other'];
  const requiredFields = ['name', 'type', 'ownership', 'adminEmail', 'password', 'confirmPassword', 'declaration'];

  // Calculate form completion progress based on steps
  const progress = useMemo(() => {
    return Math.round((currentStep / 6) * 100);
  }, [currentStep]);

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'University name is required';
    if (!formData.type) newErrors.type = 'University type is required';
    if (!formData.ownership) newErrors.ownership = 'Ownership is required';
    if (!formData.adminEmail) newErrors.adminEmail = 'Admin email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.declaration) newErrors.declaration = 'You must agree to the declaration';
    if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
      newErrors.website = 'Invalid URL format';
    }
    formData.contacts.forEach((contact, index) => {
      if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
        newErrors[`contactEmail${index}`] = 'Invalid email format';
      }
    });
    if (formData.logo && !['image/png', 'image/jpeg', 'image/jpg'].includes(formData.logo.type)) {
      newErrors.logo = 'Logo must be a PNG or JPEG image';
    }
    if (formData.brochure && formData.brochure.type !== 'application/pdf') {
      newErrors.brochure = 'Brochure must be a PDF file';
    }
    if (formData.coursesFile && !['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(formData.coursesFile.type)) {
      newErrors.coursesFile = 'Courses file must be an Excel file';
    }
    if (formData.placementCellContactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.placementCellContactEmail)) {
      newErrors.placementCellContactEmail = 'Invalid email format';
    }
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e, index = null, subField = null) => {
    const { name, value, files, type: inputType, checked } = e.target;
    const val = inputType === 'checkbox' ? checked : (files ? files : value);

    if (files) {
      if (['images', 'videos'].includes(name)) {
        const newFiles = Array.from(files);
        setFormData((prev) => ({ ...prev, [name]: [...prev[name], ...newFiles] }));
        if (name === 'images') {
          setImagePreviews((prev) => [...prev, ...newFiles.map((file) => URL.createObjectURL(file))]);
        } else if (name === 'videos') {
          setVideoPreviews((prev) => [...prev, ...newFiles.map((file) => URL.createObjectURL(file))]);
        }
      } else if (['accreditationDocs', 'affiliationDocs', 'registrationDocs'].includes(name)) {
        setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
      } else if (subField === 'contactPhoto' && index !== null) {
        setFormData((prev) => {
          const newContacts = [...prev.contacts];
          newContacts[index].photo = files[0];
          return { ...prev, contacts: newContacts };
        });
      } else {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else if (index !== null) {
      if (subField === 'contact') {
        setFormData((prev) => {
          const newContacts = [...prev.contacts];
          newContacts[index][name] = val;
          return { ...prev, contacts: newContacts };
        });
      } else if (subField === 'course') {
        setFormData((prev) => {
          const newCourses = [...prev.courses];
          newCourses[index][name] = val;
          return { ...prev, courses: newCourses };
        });
      }
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: val },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle altContact changes
  const handleAltContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      altContact: { ...prev.altContact, [name]: value },
    }));
    if (errors.altContact) {
      setErrors((prev) => ({ ...prev, altContact: '' }));
    }
  };

  // Add a new contact
  const addContact = () => {
    setFormData((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { type: '', name: '', email: '', phone: '', countryCode: '+91', linkedin: '', photo: null }],
    }));
  };

  // Remove a contact
  const removeContact = (index) => {
    setFormData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index),
    }));
  };

  // Add a new course
  const addCourse = () => {
    setFormData((prev) => ({
      ...prev,
      courses: [...prev.courses, { name: '', level: '', specialization: '', duration: '', mode: '', eligibility: '', admissionProcess: '', seats: '', fees: '', scholarships: '', placementOptions: '' }],
    }));
  };

  // Remove a course
  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  // Remove an uploaded image
  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an uploaded video
  const removeVideo = (index) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
    setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      const contactsWithPhotos = await Promise.all(
        formData.contacts.map(async (contact) => ({
          ...contact,
          photo: contact.photo ? await fileToBase64(contact.photo) : null,
        }))
      );

      const newUniversity = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        ownership: formData.ownership,
        accreditation: formData.accreditation,
        affiliation: formData.affiliation,
        established: formData.established,
        website: formData.website,
        headOfficeAddress: formData.headOfficeAddress,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        altContact: formData.altContact,
        contacts: contactsWithPhotos,
        streams: formData.streams,
        students: formData.students,
        faculty: formData.faculty,
        hostel: formData.hostel,
        campusArea: formData.campusArea,
        facilities: formData.facilities,
        about: formData.about,
        logo: formData.logo ? await fileToBase64(formData.logo) : null,
        brochure: formData.brochure ? await fileToBase64(formData.brochure) : null,
        images: await Promise.all(formData.images.map(fileToBase64)),
        videos: await Promise.all(formData.videos.map(fileToBase64)),
        socialMedia: formData.socialMedia,
        adminEmail: formData.adminEmail,
        password: formData.password,
        placementRate: formData.placementRate,
        topRecruiters: formData.topRecruiters,
        averagePackage: formData.averagePackage,
        highestPackage: formData.highestPackage,
        placementCellContactEmail: formData.placementCellContactEmail,
        internshipTieUps: formData.internshipTieUps,
        alumniInIndustry: formData.alumniInIndustry,
        rankings: formData.rankings,
        awards: formData.awards,
        notableAlumni: formData.notableAlumni,
        mediaCoverage: formData.mediaCoverage,
        intlStudentOffice: formData.intlStudentOffice,
        countriesEnrolled: formData.countriesEnrolled,
        foreignMoUs: formData.foreignMoUs,
        languageSupport: formData.languageSupport,
        visaSupport: formData.visaSupport,
        accreditationDocs: await Promise.all(formData.accreditationDocs.map(fileToBase64)),
        affiliationDocs: await Promise.all(formData.affiliationDocs.map(fileToBase64)),
        registrationDocs: await Promise.all(formData.registrationDocs.map(fileToBase64)),
        seal: formData.seal ? await fileToBase64(formData.seal) : null,
        subscriptionPlan: formData.subscriptionPlan,
        declaration: formData.declaration,
      };

      const existingUniversities = JSON.parse(localStorage.getItem('universities')) || [];
      existingUniversities.push(newUniversity);
      localStorage.setItem('universities', JSON.stringify(existingUniversities));

      alert('University registered successfully!');
      // Reset form
      setFormData({
        name: '',
        type: '',
        ownership: '',
        accreditation: '',
        affiliation: '',
        established: '',
        website: '',
        headOfficeAddress: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        altContact: { countryCode: '+91', phone: '' },
        contacts: [{ type: 'chancellor', name: '', email: '', phone: '', countryCode: '+91', linkedin: '', photo: null }],
        coursesFile: null,
        courses: [{ name: '', level: '', specialization: '', duration: '', mode: '', eligibility: '', admissionProcess: '', seats: '', fees: '', scholarships: '', placementOptions: '' }],
        streams: '',
        students: '',
        faculty: '',
        hostel: '',
        campusArea: '',
        facilities: { library: '', labs: '', researchCenters: '', sports: '', cafeteria: '', auditorium: '', medical: '', transport: '', itFacilities: '' },
        about: '',
        logo: null,
        brochure: null,
        images: [],
        videos: [],
        socialMedia: { facebook: '', twitter: '', instagram: '', linkedin: '', youtube: '' },
        adminEmail: '',
        password: '',
        confirmPassword: '',
        placementRate: '',
        topRecruiters: '',
        averagePackage: '',
        highestPackage: '',
        placementCellContactEmail: '',
        internshipTieUps: '',
        alumniInIndustry: '',
        rankings: '',
        awards: '',
        notableAlumni: '',
        mediaCoverage: '',
        intlStudentOffice: '',
        countriesEnrolled: '',
        foreignMoUs: '',
        languageSupport: '',
        visaSupport: '',
        accreditationDocs: [],
        affiliationDocs: [],
        registrationDocs: [],
        seal: null,
        subscriptionPlan: 'free',
        declaration: false,
      });
      setImagePreviews([]);
      setVideoPreviews([]);
      setCurrentStep(1);
    } catch (error) {
      alert('Error submitting registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current step
  const renderStep = (step) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#3656E5]">
              <FontAwesomeIcon icon={faUniversity} className="text-xl" />
              <h3 className="text-xl font-semibold">Step 1: Basic Information & Location</h3>
            </div>
            <p className="text-gray-600">Let's start with the essentials about your university. Take your time!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Institute Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter university name" error={errors.name} className="border-blue-300 focus:border-[#3656E5]" />
              <div>
                <label className="block text-sm font-medium text-gray-700">University Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50">
                  <option value="">Select university type</option>
                  {universityTypes.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ownership</label>
                <select name="ownership" value={formData.ownership} onChange={handleChange} className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50">
                  <option value="">Select ownership</option>
                  {ownershipTypes.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.ownership && <p className="text-red-600 text-sm mt-1">{errors.ownership}</p>}
              </div>
              <FormInput label="Accreditation" name="accreditation" value={formData.accreditation} onChange={handleChange} placeholder="Enter accreditation details" className="border-blue-300 focus:border-[#3656E5]" />
              <div>
                <label className="block text-sm font-medium text-gray-700">Affiliation</label>
                <select name="affiliation" value={formData.affiliation} onChange={handleChange} className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50">
                  <option value="">Select affiliation</option>
                  {affiliations.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <FormInput label="Year Established" name="established" type="date" value={formData.established} onChange={handleChange} className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="No. of Students" name="students" type="number" value={formData.students} onChange={handleChange} placeholder="Enter number of students" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="No. of Faculty" name="faculty" type="number" value={formData.faculty} onChange={handleChange} placeholder="Enter number of faculty" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Popular Streams" name="streams" value={formData.streams} onChange={handleChange} placeholder="e.g., Engineering, Arts" className="border-blue-300 focus:border-[#3656E5]" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Brief Description</label>
                <textarea name="about" value={formData.about} onChange={handleChange} placeholder="Tell us about your university..." className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50" rows="4" />
              </div>
              <FormInput label="Head Office Address" name="headOfficeAddress" value={formData.headOfficeAddress} onChange={handleChange} placeholder="Enter head office address" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Campus Address" name="address" value={formData.address} onChange={handleChange} placeholder="Enter campus address" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Enter city" className="border-blue-300 focus:border-[#3656E5]" />
              <div>
                <label className="block text-sm font-medium text-gray-700">State</label>
                <select name="state" value={formData.state} onChange={handleChange} className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50">
                  <option value="">Select state</option>
                  {states.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <FormInput label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Enter pincode" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Website" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://example.com" error={errors.website} className="border-blue-300 focus:border-[#3656E5]" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Alternate Contact</label>
                <div className="mt-1 flex">
                  <select name="countryCode" value={formData.altContact.countryCode} onChange={handleAltContactChange} className="w-1/4 px-3 py-3 border border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50">
                    {countryCodes.map((code) => <option key={code} value={code}>{code}</option>)}
                  </select>
                  <input type="text" name="phone" value={formData.altContact.phone} onChange={handleAltContactChange} placeholder="Phone number" className="w-3/4 px-3 py-3 border border-l-0 border-blue-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50" />
                </div>
              </div>
              <FormInput label="Facebook" name="socialMedia.facebook" value={formData.socialMedia.facebook} onChange={handleChange} placeholder="Facebook URL" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Twitter/X" name="socialMedia.twitter" value={formData.socialMedia.twitter} onChange={handleChange} placeholder="Twitter URL" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Instagram" name="socialMedia.instagram" value={formData.socialMedia.instagram} onChange={handleChange} placeholder="Instagram URL" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="LinkedIn" name="socialMedia.linkedin" value={formData.socialMedia.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="YouTube" name="socialMedia.youtube" value={formData.socialMedia.youtube} onChange={handleChange} placeholder="YouTube URL" className="border-blue-300 focus:border-[#3656E5]" />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#3656E5]">
              <FontAwesomeIcon icon={faUsers} className="text-xl" />
              <h3 className="text-xl font-semibold">Step 2: Key Persons & Courses</h3>
            </div>
            <p className="text-gray-600">Add details about important people and the programs you offer. You can add as many as needed.</p>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-800 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faUserShield} className="text-[#3656E5]" />
                  <span>Key Persons</span>
                </h4>
                <p className="text-sm text-gray-500 mt-1">Provide contact info for key staff members.</p>
                {formData.contacts.map((contact, idx) => (
                  <div key={idx} className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select name="type" value={contact.type} onChange={(e) => handleChange(e, idx, 'contact')} className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white">
                        <option value="">Select type</option>
                        {contactTypes.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <FormInput label="Name" name="name" value={contact.name} onChange={(e) => handleChange(e, idx, 'contact')} placeholder="Name" className="border-blue-300 focus:border-[#3656E5]" />
                    <FormInput label="Email" name="email" value={contact.email} onChange={(e) => handleChange(e, idx, 'contact')} placeholder="Email" error={errors[`contactEmail${idx}`]} className="border-blue-300 focus:border-[#3656E5]" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <div className="mt-1 flex">
                        <select name="countryCode" value={contact.countryCode} onChange={(e) => handleChange(e, idx, 'contact')} className="w-1/4 px-3 py-3 border border-blue-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white">
                          {countryCodes.map((code) => <option key={code} value={code}>{code}</option>)}
                        </select>
                        <input type="text" name="phone" value={contact.phone} onChange={(e) => handleChange(e, idx, 'contact')} placeholder="Phone number" className="w-3/4 px-3 py-3 border border-l-0 border-blue-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                      </div>
                    </div>
                    <FormInput label="LinkedIn" name="linkedin" value={contact.linkedin} onChange={(e) => handleChange(e, idx, 'contact')} placeholder="LinkedIn URL" className="border-blue-300 focus:border-[#3656E5]" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                      <input type="file" onChange={(e) => handleChange(e, idx, 'contactPhoto')} accept="image/*" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                      {contact.photo && <p className="text-sm text-gray-500 mt-1">Selected: {contact.photo.name}</p>}
                    </div>
                    {formData.contacts.length > 1 && (
                      <button type="button" onClick={() => removeContact(idx)} className="text-red-600 hover:text-red-800 text-sm">Remove Person</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addContact} className="mt-4 text-[#3656E5] hover:text-[#466BE9] text-sm font-medium">+ Add Another Person</button>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 flex items-center space-x-2">
                  <FontAwesomeIcon icon={faBook} className="text-[#3656E5]" />
                  <span>Courses & Programs</span>
                </h4>
                <p className="text-sm text-gray-500 mt-1">List your courses. Upload an Excel file if you have many.</p>
                {formData.courses.map((course, idx) => (
                  <div key={idx} className="mt-4 p-4 bg-blue-50 rounded-lg shadow-md space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormInput label="Course Name" name="name" value={course.name} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Course Name" className="border-blue-300 focus:border-[#3656E5]" />
                      <FormInput label="Level" name="level" value={course.level} onChange={(e) => handleChange(e, idx, 'course')} placeholder="UG/PG" className="border-blue-300 focus:border-[#3656E5]" />
                      <FormInput label="Specialization" name="specialization" value={course.specialization} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Specialization" className="border-blue-300 focus:border-[#3656E5]" />
                      <FormInput label="Duration" name="duration" value={course.duration} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Duration" className="border-blue-300 focus:border-[#3656E5]" />
                      <FormInput label="Mode" name="mode" value={course.mode} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Full-time/Part-time" className="border-blue-300 focus:border-[#3656E5]" />
                      <FormInput label="Seats" name="seats" type="number" value={course.seats} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Seats" className="border-blue-300 focus:border-[#3656E5]" />
                      <FormInput label="Fees" name="fees" value={course.fees} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Fees" className="border-blue-300 focus:border-[#3656E5]" />
                    </div>
                    <label className="block text-sm font-medium text-gray-700">Eligibility</label>
                    <textarea name="eligibility" value={course.eligibility} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Eligibility criteria" className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="2" />
                    <label className="block text-sm font-medium text-gray-700">Admission Process</label>
                    <textarea name="admissionProcess" value={course.admissionProcess} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Admission process" className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="2" />
                    <label className="block text-sm font-medium text-gray-700">Scholarships</label>
                    <textarea name="scholarships" value={course.scholarships} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Scholarship details" className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="2" />
                    <label className="block text-sm font-medium text-gray-700">Placement Options</label>
                    <textarea name="placementOptions" value={course.placementOptions} onChange={(e) => handleChange(e, idx, 'course')} placeholder="Placement options" className="w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="2" />
                    {formData.courses.length > 1 && (
                      <button type="button" onClick={() => removeCourse(idx)} className="text-red-600 hover:text-red-800 text-sm">Remove Course</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addCourse} className="mt-4 text-[#3656E5] hover:text-[#466BE9] text-sm font-medium">+ Add Another Course</button>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Courses Excel File (Optional)</label>
                  <input type="file" name="coursesFile" onChange={handleChange} accept=".xls,.xlsx" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                  {errors.coursesFile && <p className="text-red-600 text-sm mt-1">{errors.coursesFile}</p>}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#3656E5]">
              <FontAwesomeIcon icon={faImage} className="text-xl" />
              <h3 className="text-xl font-semibold">Step 3: Facilities & Placements</h3>
            </div>
            <p className="text-gray-600">Share what makes your campus special and your placement success.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Campus Size (acres)" name="campusArea" type="number" value={formData.campusArea} onChange={handleChange} placeholder="Campus size in acres" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Hostel Details" name="hostel" value={formData.hostel} onChange={handleChange} placeholder="e.g., Yes, with capacity for 1000 students" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Library" name="facilities.library" value={formData.facilities.library} onChange={handleChange} placeholder="Library details" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Labs" name="facilities.labs" value={formData.facilities.labs} onChange={handleChange} placeholder="Labs details" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Research Centers" name="facilities.researchCenters" value={formData.facilities.researchCenters} onChange={handleChange} placeholder="Research centers details" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Sports Facilities" name="facilities.sports" value={formData.facilities.sports} onChange={handleChange} placeholder="Sports facilities" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Cafeteria" name="facilities.cafeteria" value={formData.facilities.cafeteria} onChange={handleChange} placeholder="Cafeteria details" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Auditorium" name="facilities.auditorium" value={formData.facilities.auditorium} onChange={handleChange} placeholder="Auditorium details" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Medical Facilities" name="facilities.medical" value={formData.facilities.medical} onChange={handleChange} placeholder="Medical facilities" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Transport" name="facilities.transport" value={formData.facilities.transport} onChange={handleChange} placeholder="Transport details" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="IT Facilities" name="facilities.itFacilities" value={formData.facilities.itFacilities} onChange={handleChange} placeholder="IT facilities" className="border-blue-300 focus:border-[#3656E5]" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Brochure (PDF)</label>
                <input type="file" name="brochure" onChange={handleChange} accept="application/pdf" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                {errors.brochure && <p className="text-red-600 text-sm mt-1">{errors.brochure}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Images (Upload campus photos)</label>
                <input type="file" name="images" onChange={handleChange} multiple accept="image/png,image/jpeg" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {imagePreviews.map((prev, idx) => (
                      <div key={idx} className="relative">
                        <img src={prev} alt="preview" className="h-32 w-full object-cover rounded-lg shadow" />
                        <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600 hover:text-red-800"><FontAwesomeIcon icon={faTimes} className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Videos (Upload promotional videos)</label>
                <input type="file" name="videos" onChange={handleChange} multiple accept="video/mp4" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                {videoPreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {videoPreviews.map((prev, idx) => (
                      <div key={idx} className="relative">
                        <video src={prev} className="h-32 w-full object-cover rounded-lg shadow" controls />
                        <button onClick={() => removeVideo(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600 hover:text-red-800"><FontAwesomeIcon icon={faTimes} className="h-4 w-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <FormInput label="Placement Rate (%)" name="placementRate" type="number" value={formData.placementRate} onChange={handleChange} placeholder="e.g., 85" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Top Recruiters" name="topRecruiters" value={formData.topRecruiters} onChange={handleChange} placeholder="e.g., Google, Microsoft" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Average Package" name="averagePackage" value={formData.averagePackage} onChange={handleChange} placeholder="e.g., 10 LPA" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Highest Package" name="highestPackage" value={formData.highestPackage} onChange={handleChange} placeholder="e.g., 20 LPA" className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Placement Cell Email" name="placementCellContactEmail" type="email" value={formData.placementCellContactEmail} onChange={handleChange} placeholder="Placement email" error={errors.placementCellContactEmail} className="border-blue-300 focus:border-[#3656E5]" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Internship Tie-ups</label>
                <textarea name="internshipTieUps" value={formData.internshipTieUps} onChange={handleChange} placeholder="Describe internship partnerships..." className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Alumni in Industry</label>
                <textarea name="alumniInIndustry" value={formData.alumniInIndustry} onChange={handleChange} placeholder="Highlight notable alumni..." className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#3656E5]">
              <FontAwesomeIcon icon={faAward} className="text-xl" />
              <h3 className="text-xl font-semibold">Step 4: Recognition, Awards & International</h3>
            </div>
            <p className="text-gray-600">Showcase your achievements and global reach.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Rankings</label>
                <textarea name="rankings" value={formData.rankings} onChange={handleChange} placeholder="List rankings e.g., NIRF Rank 10" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Awards</label>
                <textarea name="awards" value={formData.awards} onChange={handleChange} placeholder="List awards received" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Notable Alumni</label>
                <textarea name="notableAlumni" value={formData.notableAlumni} onChange={handleChange} placeholder="Mention notable alumni" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Media Coverage</label>
                <textarea name="mediaCoverage" value={formData.mediaCoverage} onChange={handleChange} placeholder="Highlight media mentions" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <FormInput label="International Student Office" name="intlStudentOffice" value={formData.intlStudentOffice} onChange={handleChange} placeholder="Details about international office" className="border-blue-300 focus:border-[#3656E5]" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Countries Enrolled</label>
                <textarea name="countriesEnrolled" value={formData.countriesEnrolled} onChange={handleChange} placeholder="List countries of enrolled students" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Foreign MoUs</label>
                <textarea name="foreignMoUs" value={formData.foreignMoUs} onChange={handleChange} placeholder="Details of international partnerships" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Language Support</label>
                <textarea name="languageSupport" value={formData.languageSupport} onChange={handleChange} placeholder="Language support services" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Visa Support</label>
                <textarea name="visaSupport" value={formData.visaSupport} onChange={handleChange} placeholder="Visa assistance details" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" rows="4" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#3656E5]">
              <FontAwesomeIcon icon={faFileAlt} className="text-xl" />
              <h3 className="text-xl font-semibold">Step 5: Account Setup & Subscription</h3>
            </div>
            <p className="text-gray-600">Set up your admin account and choose a plan. Almost done!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput label="Admin Email" name="adminEmail" type="email" value={formData.adminEmail} onChange={handleChange} required placeholder="Admin email" error={errors.adminEmail} className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="Password" error={errors.password} className="border-blue-300 focus:border-[#3656E5]" />
              <FormInput label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm password" error={errors.confirmPassword} className="border-blue-300 focus:border-[#3656E5]" />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Accreditation Documents</label>
                <input type="file" name="accreditationDocs" onChange={handleChange} multiple className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                {formData.accreditationDocs.length > 0 && <ul className="mt-2 text-sm text-gray-500">{formData.accreditationDocs.map((file, i) => <li key={i}>{file.name}</li>)}</ul>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Affiliation Documents</label>
                <input type="file" name="affiliationDocs" onChange={handleChange} multiple className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                {formData.affiliationDocs.length > 0 && <ul className="mt-2 text-sm text-gray-500">{formData.affiliationDocs.map((file, i) => <li key={i}>{file.name}</li>)}</ul>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Registration Documents</label>
                <input type="file" name="registrationDocs" onChange={handleChange} multiple className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                {formData.registrationDocs.length > 0 && <ul className="mt-2 text-sm text-gray-500">{formData.registrationDocs.map((file, i) => <li key={i}>{file.name}</li>)}</ul>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <input type="file" name="logo" onChange={handleChange} accept="image/png,image/jpeg" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
                {errors.logo && <p className="text-red-600 text-sm mt-1">{errors.logo}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Seal</label>
                <input type="file" name="seal" onChange={handleChange} accept="image/*" className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-white" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Subscription Plan</label>
                <select name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange} className="mt-1 w-full px-3 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3656E5] focus:border-[#3656E5] bg-blue-50">
                  <option value="free">Free</option>
                  <option value="standard">Standard ₹999/mo</option>
                  <option value="premium">Premium ₹1999/mo</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Payment will be processed securely after submission.</p>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-[#3656E5]">
              <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
              <h3 className="text-xl font-semibold">Step 6: Review & Submit</h3>
            </div>
            <p className="text-gray-600">Double-check your information before submitting. Great job getting this far!</p>
            <div className="p-6 bg-blue-50 rounded-lg shadow-md space-y-4 overflow-y-auto max-h-96">
              <h4 className="text-lg font-medium text-gray-800">Basic Information</h4>
              <p className="text-sm"><strong>Name:</strong> {formData.name || 'Not provided'}</p>
              <p className="text-sm"><strong>Type:</strong> {formData.type || 'Not provided'}</p>
              <p className="text-sm"><strong>Ownership:</strong> {formData.ownership || 'Not provided'}</p>
              <p className="text-sm"><strong>Accreditation:</strong> {formData.accreditation || 'Not provided'}</p>
              <p className="text-sm"><strong>Affiliation:</strong> {formData.affiliation || 'Not provided'}</p>
              <p className="text-sm"><strong>Established:</strong> {formData.established || 'Not provided'}</p>
              <p className="text-sm"><strong>Students:</strong> {formData.students || 'Not provided'}</p>
              <p className="text-sm"><strong>Faculty:</strong> {formData.faculty || 'Not provided'}</p>
              <p className="text-sm"><strong>Streams:</strong> {formData.streams || 'Not provided'}</p>
              <p className="text-sm"><strong>About:</strong> {formData.about || 'Not provided'}</p>
              <h4 className="text-lg font-medium text-gray-800">Contact & Location</h4>
              <p className="text-sm"><strong>Head Office:</strong> {formData.headOfficeAddress || 'Not provided'}</p>
              <p className="text-sm"><strong>Campus:</strong> {formData.address}, {formData.city}, {formData.state} {formData.pincode || 'Not provided'}</p>
              <p className="text-sm"><strong>Website:</strong> {formData.website || 'Not provided'}</p>
              <p className="text-sm"><strong>Alt Contact:</strong> {formData.altContact.countryCode} {formData.altContact.phone || 'Not provided'}</p>
              <p className="text-sm"><strong>Social Media:</strong> FB-{formData.socialMedia.facebook || 'N/A'}, X-{formData.socialMedia.twitter || 'N/A'}, IG-{formData.socialMedia.instagram || 'N/A'}, LI-{formData.socialMedia.linkedin || 'N/A'}, YT-{formData.socialMedia.youtube || 'N/A'}</p>
              <h4 className="text-lg font-medium text-gray-800">Key Persons</h4>
              {formData.contacts.map((c, i) => (
                <p key={i} className="text-sm"><strong>{c.type}:</strong> {c.name || 'N/A'}, {c.email || 'N/A'}, {c.countryCode} {c.phone || 'N/A'}, LI-{c.linkedin || 'N/A'}, Photo-{c.photo?.name || 'None'}</p>
              ))}
              <h4 className="text-lg font-medium text-gray-800">Courses</h4>
              {formData.courses.map((c, i) => (
                <p key={i} className="text-sm"><strong>{c.name} ({c.level}, {c.specialization}):</strong> Duration: {c.duration || 'N/A'}, Mode: {c.mode || 'N/A'}, Seats: {c.seats || 'N/A'}, Fees: {c.fees || 'N/A'}</p>
              ))}
              <h4 className="text-lg font-medium text-gray-800">Facilities</h4>
              <p className="text-sm"><strong>Campus Area:</strong> {formData.campusArea || 'Not provided'}</p>
              <p className="text-sm"><strong>Hostel:</strong> {formData.hostel || 'Not provided'}</p>
              <p className="text-sm"><strong>Library:</strong> {formData.facilities.library || 'Not provided'}</p>
              {/* Add similar for other facilities */}
              <h4 className="text-lg font-medium text-gray-800">Placements</h4>
              <p className="text-sm"><strong>Rate:</strong> {formData.placementRate || 'Not provided'}%, <strong>Avg Package:</strong> {formData.averagePackage || 'Not provided'}, <strong>High Package:</strong> {formData.highestPackage || 'Not provided'}</p>
              {/* Add more details as needed */}
            </div>
            <label className="flex items-center space-x-2 text-gray-700">
              <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} className="form-checkbox h-5 w-5 text-[#3656E5]" />
              <span className="text-sm">I declare that the information provided is accurate and complete.</span>
            </label>
            {errors.declaration && <p className="text-red-600 text-sm">{errors.declaration}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
        <div className="relative mb-8">
          <h2 className="text-3xl font-bold text-[#3656E5] text-center">
            University Registration - Step {currentStep} of 6
          </h2>
          <p className="text-center text-gray-500 mt-2">We're here to help you showcase your institution. Fill in at your pace!</p>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-blue-100"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
              />
              <circle
                className="text-[#3656E5]"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="45"
                cx="50"
                cy="50"
                strokeDasharray="283"
                strokeDashoffset={283 - (progress * 2.83)}
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="50"
                fill="#3656E5"
                fontSize="20"
                textAnchor="middle"
                dy=".3em"
              >
                {progress}%
              </text>
            </svg>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-10">
          {renderStep(currentStep)}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Previous
              </button>
            )}
            {currentStep < 6 && (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="bg-[#3656E5] hover:bg-[#466BE9] text-white font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Next
              </button>
            )}
            {currentStep === 6 && (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`bg-[#3656E5] hover:bg-[#466BE9] text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2 h-5 w-5" />
                    Submitting...
                  </>
                ) : (
                  'Submit Registration'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UniversityRegister; 