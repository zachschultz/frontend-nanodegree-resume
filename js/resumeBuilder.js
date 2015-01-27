// Model will contain the data for 'bio', 'projects', 'education', etc.
var model = {

	bio : {
		'firstName' : 'Zach',
		'lastName' :  'Schultz',
		'role' : 'Software Developer',
		'welcomeMessage': 'My name is Zach and I am a Computer Science Engineering student at the University of Florida. My passion is to develop software that will make people\'s lives more intersting, fun, and easy.',
		'contacts' : {
			'email' : 'zacharymschultz@gmail.com',
			'mobile' : '561-400-3685',
			'github' : 'zachschultz',
			'twitter' : '@zachmax',
			'location' : 'Vallendar, DE'
		},
		'bioPic': 'img/me.png',
		
		'skills' : [
			'JavaScript','Java','HTML','CSS'
		]
	},

	"schools" : [
		{
			"name" : "University of Florida",
			"major" : "Computer Science Engineering",
			"degree" : "BA",
			"minor" : "Business Administration",
			"dates" : "May 2012 - May 2016",
			"location" : "Gainesville, FL"
		}
	],

	"projects": [
        {
            "title": "Resume",
            "dates": "Jan. 2015",
            "description": "Using Udacity course 'JavaScript Basics' and 'JavaScript Design Patterns' I created this resume. It is dynamically produced using JavaScript and jQuery and follows a planned, well-designed and organized structure.",
            "images": [
                "img/project-resume-img-1.png",
                "img/project-resume-img-2.png"
            ]
        }
    ],

    "jobs" : [
		{
			"employer" : "IBM",
			"title" : "Managed Security Services Intern.",
			"location" : "Atlanta, GA",
			"dates" : "May 2014 - August 2014",
			"description" : "During this internship I managed QRadar scripts and logs on production consoles. I also standardized the main scripts needed to initialize monitoring on customer consoles. To complete this task, I wrote Python scripts in order to easily pull files from a filesystem hierarchy. As a team with the rest of the interns, I helped design a PostgreSQL database to maintain IBM’s test lab devices."
		}
	]

};

var controller = {

	init : function() {
		view.init();
	},

	getBio : function() {
		return model.bio;
	},
	getModel : function() {
		return model;
	},
	getEducation : function() {
		return model.schools;
	},
	getProjects : function() {
		return model.projects;
	},
	getJobs : function() {
		return model.jobs;
	}

};

var view = {

	init : function() {
		this.headerElem = $('#header');
		this.topContactsElem = $('#topContacts');
		this.workExperienceElem = $('#workExperience');
		this.projectsElem = $('#projects');
		this.educationElem = $('#education');
		this.mapDivElem = $('#mapDiv');
		this.letsConnectElem = $('#letsConnect');
		this.footerContactsElem = $('#footerContacts');

		this.render();
	},

	displayBio : function() {
		var bio = controller.getBio();

		// Add name and role to resume
		var firstNameHtml = '<span class="thin">'+bio.firstName+'</span>';
		var formattedName = HTMLheaderName.replace('%data%', firstNameHtml + bio.lastName);
		var formattedRole = HTMLheaderRole.replace('%data%', bio.role);
		this.headerElem.prepend(formattedRole);
		this.headerElem.prepend(formattedName);

		var formattedMobile = HTMLmobile.replace('%data%',bio.contacts.mobile);
		var formattedEmail = HTMLemail.replace('%data%',bio.contacts.email);
		var formattedTwitter = HTMLtwitter.replace('%data%',bio.contacts.twitter);
		var formattedGithub = HTMLgithub.replace('%data%',bio.contacts.github);
		var formattedLocation = HTMLlocation.replace('%data%',bio.contacts.location);
		
		// Append to top contacts section of website
		this.topContactsElem.append(formattedMobile);
		this.topContactsElem.append(formattedEmail);
		this.topContactsElem.append(formattedGithub);
		this.topContactsElem.append(formattedTwitter);
		this.topContactsElem.append(formattedLocation);
		// Append to 'Let's Connect' contacts section of website
		this.footerContactsElem.append(formattedMobile);
		this.footerContactsElem.append(formattedEmail);
		this.footerContactsElem.append(formattedGithub);
		this.footerContactsElem.append(formattedTwitter);
		this.footerContactsElem.append(formattedLocation);

		// Append welcome message and bioPic to #header
		this.headerElem.append(HTMLbioPic.replace('%data%', bio.bioPic));
		this.headerElem.append(HTMLWelcomeMsg.replace('%data%',bio.welcomeMessage));
		
		// Append skills to header
		if (bio.skills.length > 0) {
			this.headerElem.append(HTMLskillsStart);
			for (var i = 0; i < bio.skills.length; i++) {
				var formattedSkill = HTMLskills.replace('%data%', bio.skills[i])
				$('#skills').append(formattedSkill);
			}
		}
	
	},

	displayEducation : function() {
		var education = controller.getModel();

		// Create div to contain education entries
		this.educationElem.append(HTMLschoolStart);

		
		for (school in education.schools) {
			var formattedSchoolName = HTMLschoolName.replace('%data%',
				education.schools[school].name);

			var formattedSchoolDegree = HTMLschoolDegree.replace('%data%',
				education.schools[school].degree);
			var formattedSchoolDates = HTMLschoolDates.replace('%data%',
				education.schools[school].dates);
			var formattedSchoolLocation = HTMLschoolLocation.replace('%data%',
				education.schools[school].location);
			var formattedSchoolMajor = HTMLschoolMajor.replace('%data%',
				education.schools[school].major);
			var formattedSchoolMinor = HTMLschoolMinor.replace('%data%',
				education.schools[school].minor);
			$('.education-entry').append(formattedSchoolName + formattedSchoolDegree);
			$('.education-entry').append(formattedSchoolDates);
			$('.education-entry').append(formattedSchoolLocation);
			$('.education-entry').append(formattedSchoolMajor);
			$('.education-entry').append(formattedSchoolMinor);
		}
	},

	displayProjects : function() {
		var projects = controller.getModel();

		for (project in projects.projects) {
			// Create div for project entry
			this.projectsElem.append(HTMLprojectStart);
			// Format project info
			var formattedTitle = HTMLprojectTitle.replace('%data%',projects.projects[project].title);
			var formattedDates = HTMLprojectDates.replace('%data%',projects.projects[project].dates);
			var formattedDescription = HTMLprojectDescription.replace('%data%',projects.projects[project].description);
			// Append formatted work info
			$('.project-entry:last').append(formattedTitle);
			$('.project-entry:last').append(formattedDates);
			$('.project-entry:last').append(formattedDescription);
			
			// Check if multiple images then append
			if (projects.projects[project].images.length > 0) {
				// Keep count of photo for 'dataLightboxTitle'
				var photoCount = 0;
				for (image in projects.projects[project].images) {
					var imgSrc = projects.projects[project].images[image];
					var dataLightboxInfo = projects.projects[project].title;
					var dataLightboxTitle = projects.projects[project].title + "-" +photoCount++;
					var formattedImage = HTMLprojectImage.replace('%data%', imgSrc);
					// Wrap 'formattedImage' HTML in 'a' tag for Lightbox functionality
					formattedImage = $(formattedImage).wrap('<a class="lightbox-image-link" data-title="'+dataLightboxTitle+'" data-lightbox="'+dataLightboxInfo+'" href="'+imgSrc+'"/>');
					$('.project-entry:last').append(formattedImage.parent());
				}
			}
		}

	},

	displayJobs : function() {
		var work = controller.getModel();

		for (job in work.jobs) {
			// Create div for work section
			this.workExperienceElem.append(HTMLworkStart);
			// Format work info
			var formattedEmployer = HTMLworkEmployer.replace('%data%',work.jobs[job].employer);
			var formattedTitle = HTMLworkTitle.replace('%data%',work.jobs[job].title);
			var formattedDates = HTMLworkDates.replace('%data%',work.jobs[job].dates);
			var formattedLocation = HTMLworkLocation.replace('%data%',work.jobs[job].location);
			var formattedDescription = HTMLworkDescription.replace('%data%',work.jobs[job].description);
			// Append formatted work info
			$('.work-entry:last').append(formattedEmployer + formattedTitle);
			$('.work-entry:last').append(formattedDates);
			$('.work-entry:last').append(formattedLocation);
			$('.work-entry:last').append(formattedDescription);
		}
	},

	render : function() {
		// Map of where I've lived and worked
		this.mapDivElem.append(googleMap);

		this.displayBio();
		this.displayEducation();
		this.displayProjects();
		this.displayJobs();
	}

};
 
// Run our resume!   
controller.init();

