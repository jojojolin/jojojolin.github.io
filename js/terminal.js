const interval = 50; //default delay for printing next char
const greeting = "Hi there! My name's Chih-Yun and I'm currently a Computer Science student at King's College London. Welcome to my site :-)";
const instruction1 = "To get started, please type in the command ";
const h = "<span class='keyword'>h</span>";
const instruction2 = " or ";
const help = "<span class='keyword'>help</span>";
const instruction3 = ", followed by the 'enter' key, to see a list of further available commands.";
var user = 'visitor';
var spanuser = document.getElementById('user');
var commandList = [];
var upLimit = 0;
var commLine = "";
var comm = "";
var termBody = "";
var message = "";
var cmd = "";
var lookup = new Array(26); //26 letters
const availableCmds = ['ABOUT','ACTIVITIES','CLEAR','CONTACT','CV','EDUCATION','EXPERIENCE','H','HELP','HIDE','MODULES','NAME','PROJECTS','RESUME','SHOW'];
const siteName = '@Chihyun\'s-site';
var msgHelp="<div class='terminalMessage'>======= HELP =======<p><span class='keyword'>ls</span> (lower case L): See commands for available 'pages'</p><p><span class='keyword'>name yourname</span>: Change the user from 'visitor@' to 'yourname@'. For example, 'name Captain Marvel' would change it to <span class='user'>CaptainMarvel" + siteName + " ~ $</span></p><p><span class='keyword'>up/down arrow keys</span>: Cycle through previously entered commands</p><p><span class='keyword'>clear</span>: Clear all displayed data from the terminal</p><p><span class='keyword'>hide/show</span>: Hide or show the introduction above</p></div><p><span class='keyword'>tab key</span>: Autocomplete command or return a list of matching commands. Tab pressed without any input string will list all possible commands.</p>";

//Preload lookup table
lookup.fill(null);
for (i = 0; i < availableCmds.length; i++){
    insert(availableCmds[i]);
}

/************************************
** Description: let the cursor blink
************************************/
function inputFocus() {
    document.getElementById('commandLine').focus();
}

/************************************
** Description: clear all elements/text in the terminal html
************************************/
function clear(){
    document.getElementById("instruct").innerHTML = "";
}

/************************************
** Description: parse text into command and 'execute' it by 
**              adding the corresponding response to the html
** Param: command(string)
************************************/
function executeCmd(e) {
    e = e || window.event;
    if ((e.which == 13) || (e.keyCode == 13))
    {
        commLine = document.getElementById('commandLine');
        comm = '<div class="terminalCommand"><span class="user">' +user + siteName+' ~ $ </span>' + '<span class="command">' + commLine.value + '</span></div>';
        termBody = document.getElementById('terminalBody');
        message = "";
        cmd = commLine.value.split(" ");
        commandList.push(commLine.value);
        switch(cmd[0].toUpperCase())
        {
            case "NAME":
            if(cmd[1])
            {  
                user="";
                for (i=1; i<cmd.length;i++){
                    user+=cmd[i];
                }
                spanuser.innerHTML = user + siteName + ' ~ $ ';
                message = "<div class='terminalMessage'>User set to '" + user + "'</div>";
            }
            else
            {
                spanuser.innerHTML = user + siteName + ' ~ $ ';
                message = "<div class='terminalMessage'>User set to 'visitor'</div>";
            }
            break;
            case "H":
            message =msgHelp;
            break;
            case "HELP":
            message = msgHelp;
            break;
            case "LS":
            message = "<div class='terminalMessage'>";
            message += "======= PAGES =======<br/><span class='tip'>[Tip]</span> Use the commands in blue to 'naviagate' to the 'pages'.";
            message += "<p><span class='keyword'>about</span>: Brief introduction of myself</p>";
            message += "<p><span class='keyword'>experience</span>: My work experience</p>";
            message += "<p><span class='keyword'>projects</span>: Projects I've done with links</p>";
            message += "<p><span class='keyword'>modules</span>: Modules I took in the University</p>";
            message += "<p><span class='keyword'>education</span>: My educational background</p>";
            message += "<p><span class='keyword'>activities</span>: Interesting activities I've taken part</p>";
            message += "<p><span class='keyword'>cv</span> or <span class='keyword'>resume</span>: My resume in PDF</p>";
            message += "<p><span class='keyword'>contact</span>: Get in touch via email, or check out my GitHub repo</p>";
            message += "</div>";
            break;
            case "ABOUT":
            message = "<div class='terminalMessage'>";
            message += "======== ABOUT ME ========";
            message += "<p>I love art, quantum physics, philosophy and <span class='highlight'>PROGRAMMING</span>.</p>";
            message += "<p>I enjoy working with <span class='highlight'>Java, Go, C, Python, HTML, CSS, JavaScript, MySQL</span> and <span class='highlight'>PHP</span>.</p>";
            message += "<p>I'm constantly learning new languages and technologies in my spare time. I've just recently built <a href='https://github.com/jojojolin/learn_microservices'>microservices</a> in <span class='highlight'>Go</span>!</p><p>Right now, I'm taking the course - <a href='https://eu.udacity.com/facebook-AI-scholarship'>Secure and Private AI Challenge Scholarship</a> - delivered by Facebook's AI research team on Udacity! It's a 3-month nanodegree course and I'm dedicating 10 hours a week to it.</p>";
            message += "</div>";
            break;
            case "EDUCATION":
            message = "<div class='terminalMessage'>========= EDUCATION =========";
            message += "<p>King's College London, 2016-2019<br />- BSc (Hons) Computer Science with Artificial Intelligence<br /><br /> <span class='tip'>[Tip]</span> Use command <span class='keyword'>modules</span> to find out more about my course modules!<br/></p>";
            message += "<p>The British School of Guangzhou, 2014-2015<p>";
            message += "<p>Anglican High School, Singapore, 2011-2013<p>";
            message += "</div>";
            break;
            case "MODULES":
            message = "<span class='tip'>[Year 3]</span><br /> Pattern Recognition; Computer Vision; Artificial Intelligence; Agent and Multi-agents Systems; Distributed Systems; Optimization Methods; Individual Project(Quantum Computing and Algorithms)<br /><span class='tip'>[Year 2]</span><br /> Foundations of Computing 2; Introduction to Robotics; Operating Systems and Concurrency; Object-Oriented Specification and Design; Practical Experience of Programming; Programming Language Design Paradigms; Robotics Group Project<br /><span class='tip'>[Year 1]<br /></span> Computer Systems; Database systems; Data Structures; Elementary Logic with Applications; Foundations of Computing 1; Introduction to Artificial Intelligence; Programming Practice and Application "
            break;
            case "PROJECTS":
            message = "<p>Operation Board Game: <a href='https://github.com/jojojolin/operationDemo'>git</a><br />Face-tracking + Sticker Java App: <a href='https://github.com/jojojolin/FaceDetectionJava'>git</a><br />Quantum Random Walk Algorithm: <a href='https://github.com/jojojolin/quantumwalk'>git</a><br />8btc Forum Scraper: <a href='https://github.com/jojojolin/8btc_scraper'>git</a></p>";
            break;
            case "EXPERIENCE":
            message = "--------<br /><span class='tip'>Room One Ltd</span>, London, 2018/01/03-2018/03/31<br /> Software Engineer<br /><ul type='Circle'><li>Worked primarily in Python and ROS on Ericsson’s 5G demo project for MWC 2018</li><li>My tasks encompassed the network and robotics aspects of the project:<ul><li>Socket programming</li><li>Applying mathematics to map the XY coordinates of the human leg to the joint angles of the robot</li></ul></li><li>Optimised human-robot motion synchronisation by using asynchronous HTTP requests <a href='https://twitter.com/roomonelondon/status/969268929565782017'>Link</a></li></ul>--------<br /><span class='tip'>Centre for Telecommunications Research</span>, King’s College London, 2017/09/05-2018/03/31<br />Network Engineer<br /><ul type='Circle'><li>Worked in an agile manner with the team developing the prototype infrastructure for the UK’s 5G-data core</li><li>Worked in a linux environment and used command line for most of my tasks</li><li>Implemented the MP-TCP/IP proxy in C on a linux server</li></ul>--------<br /><span class='tip'>Runwedia</span>, Taipei, 2017/07/21 - 2017/08/31<br />Frontend Developer Intern<br /><ul><li>Designed and developed websites using JS, PHP, HTML and CSS</li><li>Communicated with clients and refined requirement specifications</li></ul>--------<br /><span class='tip'>Cyberlink</span>, Taipei, 2016/06/01 - 2016/08/25<br />UI Designer Intern<br /><ul><li>Designed icons and graphics using Adobe Photoshop and Illustrator</li></ul>";
            break;
            case "ACTIVITIES":
            message = "--------<br /><span class='tip'>Facebook Secure and Private AI Scholarship</span>,  Udacity, 2019/06-2019/09<br /><ul type='Circle'><li>Learning 10 hours a week over 3 months on Federated Learning, Differential Privacy, and Encrypted Computation</li><li>Using Pytorch and OpenMined's PySyft to train AI models while securing users' privacy</li></ul>--------<br /><span class='tip'>Facebook Hack A Project</span>,  London, 2018/10-2018/11<br /><ul type='Circle'><li>6-week program at Facebook HQ with mentoring support from senior software engineers</li><li>Worked on the backend of an Android App that uses Node.js with Express framework and Heroku for infrastructure</li></ul>--------<br /><span class='tip'>China Internet Industry Immersion Trip</span><br />Beijing, 2017/08<br /><ul type='Circle'><li>Rotated around different departments during the internship at Xinhuanet</li><li> Visited Huawei, Mobike and JD.com</li></ul>--------";
            break;
            case "CONTACT":
            message = "<div class='terminalMessage'><p>Feel free to drop me an <a href='mailto:chih-yun.chien@kcl.ac.uk'>email</a> or check out my <a href='https://github.com/jojojolin'>github</a>!</p></div>";
            break;
            case "CLEAR":
            message = "";
            break;
            case "CV":
            message = "<div class='terminalMessage'><a href='res/Chien_Chih-Yun_CV.pdf'>Click here to open</a></div>";
            break;
            case "RESUME":
            message = "<div class='terminalMessage'><a href='res/Chien_Chih-Yun_CV.pdf'>Click here to open</a></div>";
            break;
            case "SHOW":
            document.getElementById("intro").style.display="block";
            document.getElementById("terminalBody").style.maxHeight="50vh";
            break;
            case "HIDE":
            document.getElementById("intro").style.display="none";
            document.getElementById("terminalBody").style.maxHeight="80vh";
            break;
            default:
            message = "<div class='terminalMessage'>Unrecognised command. For a list of commands, enter <span class='keyword'>h</span> or <span class='keyword'>help</span>.</div>";
        }
        termBody.innerHTML += comm;
        if(cmd[0].toUpperCase() == 'CLEAR')
        {
            termBody.innerHTML = message;
        }
        else
        {
            termBody.innerHTML += message;
        }
        commLine.value = "";
        termBody.scrollTop = termBody.scrollHeight;
        upLimit = 0;
    }
    else if ((e.which == 38) || (e.keyCode == 38))
    {
        commLine.value = "";
        if(upLimit <= commandList.length -1)
        {
            upLimit++;
            commLine.value = commandList[commandList.length-upLimit];
        }
    }
    else if ((e.which == 40) || (e.keyCode == 40))
    {
        commLine.value = "";
        if(upLimit >= 1)
        {
            commLine.value = commandList[commandList.length-upLimit];
            upLimit--;
        }
    }
    else if ((e.which == 9) || (e.keyCode == 9))
    {               
        e.preventDefault(); //prevent default tab response
        commLine = document.getElementById('commandLine');
        termBody = document.getElementById('terminalBody');
        cmd = commLine.value.split(" ");
        if (cmd.length < 2)
        {
            let options = search(cmd[0].toUpperCase());
            if (options.length == 1)
            {   
                commLine.value = options[0].toLowerCase();
            }
            else if(options.length > 1)
            {   
                termBody.innerHTML += '<div class="terminalCommand"><p><span class="user">' +user + siteName+' ~ $ </span>' + '<span class="command">' + commLine.value + '</span></div><div class ="terminalMessage">';
                for (i = 0; i < options.length; i++){
                    termBody.innerHTML += '<span class = "keyword">' + options[i].toLowerCase()+'</span>&nbsp&nbsp';
                    if ((i+1)%5 == 0){
                        termBody.innerHTML +='<br />';
                    }
                }
                termBody.innerHTML += "</div>";
            }
        }
        termBody.scrollTop = termBody.scrollHeight;
    }
}

/************************************
** Description: print a sentence character by character
** Params : id of the div to append the text, and the text to print
** Return : a Promise to ensure that the next sentence to print waits until the
** current one finishes
************************************/
function fireSentence(id, sentence){
  var delay = 0;
  for(var i = 0; i < sentence.length; i++){
    (function(i) {
      setTimeout(function() {
        document.getElementById(id).innerHTML+=sentence[i]; 
      }, interval * (i+delay));
      // Add slightly longer pauses to these symbols:
      if(sentence[i]=="." || sentence[i]=="!" || sentence[i]==","){
            delay+=3;
      }
    })(i);
  }
   return new Promise(resolve => resolve(sentence.length+delay))
}

/************************************
** Description: print a keyword with special css
** Params : id of the keyword to print
** Return : a Promise to ensure that the next string to print waits until the
** current one finishes
************************************/
function fireKeyword(id, word){
    document.getElementById(id).innerHTML+=word; 
   return new Promise(resolve => resolve(1))
}

/************************************
** Description: insert commands into lookup table during preload.
**              each element in the array is a bin which contains 
**              a signly linked list
** Params : command(string)
************************************/
function insert(command){
    let key = command.charCodeAt(0) - 65;
    let newObj = { 
            value:command,
            next:null
    };
    if (lookup[key] == null){
        lookup[key] = newObj;
    }
    else{
        let current = lookup[key];
        while(current.next!=null){
            console.log("current is "+current.value);
            current=current.next;

        }
        current.next = newObj;
    }
}

/************************************
** Description: search commands from lookup table given keyword          
** Params : keyword(string)
** Return : a list of matching commands available
************************************/
function search(keyword){
    let options = [];
    //Edge case 1 : empty string -> display all commands
    if (keyword == "") return availableCmds;
    let l = keyword.length;
    let k = keyword.charCodeAt(0)-65;
    let current = lookup[k];
    //Edge case 2 : invalid command -> ignore
    if (current == null) return options;
    while (current != null)
    {
        if (current.value.length >= keyword.length && current.value.slice(0,l) == keyword)
        {
            options.push(current.value);
        }
        current = current.next;
    }
    return options;
}