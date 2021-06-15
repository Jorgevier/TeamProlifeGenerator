const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "Whats the Managers name?"
      },
      {
        type: "input",
        name: "managerId",
        message: "Whats the Manager's Id?"
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Whats the Manager's email?"
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Whats the Manager's office number?"
      }
      //
      // YOUR CODE HERE:
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      //
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Whats the Engineer's name?"
      },
      {
        type: "input",
        name: "engineerId",
        message: "Whats the Engineer's Id?"
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Whats the Engineer's email?"
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "Whats the Engineer's Github?"
      }
      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
      teamMembers.push(engineer);
      idArray.push(answers.engineerId);
      createTeam();
    });
  }

      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      // 
 
     

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "Whats the Intern's name?"
      },
      {
        type: "input",
        name: "internId",
        message: "Whats the Intern's Id?"
      },
      {
        type: "input",
        name: "internEmail",
        message: "Whats the Intern's email?"
      },
      {
        type: "input",
        name: "internSchool",
        message: "Whats the Intern's school?"
      }
      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
      teamMembers.push(intern);
      idArray.push(answers.internId);
      createTeam();
    });
  }
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE INTERN CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
      // 

   

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
