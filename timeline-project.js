/****************************PROJECT DESCRIPTION**********************************************
This timeline project displays questions for the user to answer about their key life events. 
The answers are then used to create sentences which are added to a "life timeline" that is displayed
in the above container.
*********************************************************************************************/

//Make a set of categories
var categorySet = {
  set: [],
  answers: []
}

//Add new categories to category set
function addCategory(category){
  categorySet.set.push(category);
}

//Consructor for categories
function Category(name){
  this.name = name;
  this.questionArray = [];
  this.outputStatement = "";
}

//Add questions to a category
Category.prototype.addQuestion = function(question){
  this.questionArray.push(question);
}


//Function to make HTML with category heading and question content
Category.prototype.toHTML = function(){
    var myHTML = "<li id='";
    myHTML += this.name;
    myHTML += "'><h3>";
    myHTML += this.name;
    myHTML += "</h3></li>";
    for (var i = 0; i < this.questionArray.length; i++){
      myHTML += "<p id='" + this.questionArray[i].id + "''>";
      myHTML += this.questionArray[i].question;
      myHTML += this.questionArray[i].inputField;
      myHTML += "</p>";
    }
    return myHTML;
}

/*Constructor for questions which will be pushed into a Category's questionArray
I've assigned an ID property so that it can be made as an ID in the <p> element
to make extraction of a specific question's answer easier in future edits */
function Question(id, question){
  this.id = id;
  this.question = question;
  this.inputField = "<input type='text' class='writeAnswer'>";
}




//Put category names into HTML element
function putCategoriesInElement() {
  var categoryListElement = document.getElementById("categories");
  categoryListElement.innerHTML = "";
  for (var i = 0; i < categorySet.set.length; i++){
    categoryListElement.innerHTML += categorySet.set[i].toHTML();
  }
}



//Create new instances of categories and questions
//We could make several new categories, like "marriage", "travel", "start career", etc.
var birth = new Category("Birth", "I was born in");
var whenBorn = new Question("whenBorn", "In which year were you born?");
var whereBorn = new Question("whereBorn", "In which city were you born?");

var graduation = new Category("Graduation", "I graduated in");
var whenGraduate = new Question("whenGraduate", "In which year did you graduate?");
var whichSchool = new Question ("whichSchool", "From which school did you graduate?");


//Add categories to categorySet, and add questions to their respective categories
addCategory(birth);
birth.addQuestion(whenBorn);
birth.addQuestion(whereBorn);

addCategory(graduation);
graduation.addQuestion(whenGraduate);
graduation.addQuestion(whichSchool);


//Call the earlier function to put category names in HTML element
putCategoriesInElement();



//Take the username from import and write "(username)'s Timeline" as a heading
$("button.usernameInput").click(function(){
  var $usernameInput = $("#usernameInput").val();
  $("#usernameInputDiv").hide();
  console.log($usernameInput);
  var outerDiv = document.getElementById("outerDiv");
  outerDiv.innerHTML = "<h1>" + $usernameInput + "'s Timeline</h1>";
})


//Take the user input on click and place corresponding sentences in the timeline list
var timelineList = document.getElementById("timelineList");
function getAnswers(){
  $("#submitInfo").click(function(){
    var input = document.getElementsByClassName("writeAnswer");
    for (var i = 0; i < input.length; i++){
      if (!input[i].value){
        categorySet.answers = [];
        alert("You didn't answer all of the questions. If there's question you would prefer not to answer, please simply write 'n/a'.");
        return;
      }
    }
    for (var i = 0; i < input.length; i++){
      categorySet.answers.push(input[i].value);
      input[i].value = "";
    }
    console.log(categorySet.answers);
    birth.outputStatement += "I was born in " + categorySet.answers[0] + " in " + categorySet.answers[1];
    graduation.outputStatement += "I graduated from " + categorySet.answers[3] + " in " + categorySet.answers[2];
    timelineList.innerHTML += "<li>" + birth.outputStatement + ".</li><li>" + graduation.outputStatement + ".</li>";
  })
}

getAnswers();


/*************************  NEED TO WORK ON ***********************************************

Timelines should be in chronological (or reverse-chronological) order, but our complete
question list might not present the questions in the right order according to our user's
personal life events. It would be nice to be able to sort the output statements for each
category according the year they contain. With the code I've written, that would be very
difficult to achieve, since the years are simply written inside the outputStatement strings.

In the future, I would like to create a "year" property for the Category constructor, and find
a way to store user input values into each category's year property so that the categories
can be chronologically sorted.



*******************************************************************************************/
















