// client-side js

var count = 0; 

function getQuestion(){
  // load all questions
  
  $("form").fadeIn("slow");
  $("._options").show();
  $("#submit-ritual").delay(2000).show();
  
  $.get('/votes', function(items) {
    
    console.log(items);
    let rand = items[Math.floor(Math.random() * items.length)];
    
    $("._question").text( rand[1] );
    $("form").attr( "data-question" , rand[0] );
    
    // update progress bar
    $("#belief").attr( "value" , rand[3] );
    $("#belief").attr( "max" , rand[4] );
    
  });
}

function start(){
  
  $("header p").delay(500).text("do your best to").delay(3000).text("tell me...");
  $("#start").fadeOut("slow");

  setTimeout(function() { getQuestion(); $("._menu").fadeIn('slow'); }, 3000);
  
}

$("._options input[name='choice']").change(function(){
  $("#submit-ritual").prop("disabled", false);
});

$( "#start" ).hover(function(){
  $("#start").text("i can try"); 
});

$(function() {
  
  // when form is submitted
  $('form').submit(function(event) {
    event.preventDefault();
    console.log("swag " + $('._options input[name="choice"]:checked').val());
    
    let response = $("._text input").val();
    let i = parseInt($("form").attr( "data-question" ));
    let votes = parseInt($("#belief").attr( "value" ));
    let total = parseInt($("#belief").attr( "max" ));
    
    let answer; // t: yes, f: no
    
    if ($('._options input[name="choice"]:checked').val() == "Yes") {
      // + yes & total
      answer = true;
      votes++;
    } else if($('._options input[name="choice"]:checked').val() == "No"){
      // + total
      answer = false;
    } else{
      // error
      console.log("nothing");
      return;
    }
    
    total++;

    // which question is this?
    console.log( $("form").attr("data-question") );
    

    $.post('/speak?' + $.param({ index: i, response: response, yes: votes, total: total }), function() {
      
      $("#belief").attr( "value", votes);
      $("#belief").attr( "max", total);
      
      console.log("submitting... " + votes + " / " + total);
      
      
      // adjust results
      if(answer){ // show other yes
        $("._results span.n").text(votes);
        $("._results span.a").text("yes");
      } else{ // show other nos
        $("._results span.n").text(total - votes);
        $("._results span.a").text("no");
      }
      
      // fades
      $("#submit-ritual, ._options").fadeOut("fast");
      $("._results").fadeIn();
      
      // append answer to your special section
      $("section#answers").append("<div class='_answer'><p>" + $("._question").text() + "<br>" + $('._options input[name="choice"]:checked').val() + ".</p>").hide().fadeIn("slow");
      
      // uncheck inputs
      $("._options input[name='choice']:checked").prop('checked', false);
      
      // increment counter next to title
      count++;
      $("._title sup").text(count);
  
      setTimeout(function() { getQuestion(); $("._results").fadeOut(); }, 5000);
    
      // $('input#fName').val('');
      // $('input#lName').val('');
      // $('input').focus();
    });
  });


});
