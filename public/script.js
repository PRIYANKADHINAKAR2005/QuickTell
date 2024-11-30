const textArea=document.getElementById("text_to_summarize")
const submitButton=document.getElementById("submit-button")
const summaryTextArea=document.getElementById("summary")

submitButton.disabled=true;
submitButton.addEventListener("click",submitData)
textArea.addEventListener("input",verifyTextLength)
function verifyTextLength(e)
{
  const text=e.target.value;
  if(text.length<50 && text.length>100000)
  {
    submitButton.disabled=true;
  }
  else
  {
    submitButton.disabled=false;
  }
}

function submitData(e)
{
  submitButton.classList.add("submit-button--loading");
  const text=textArea.value;
  var header=new Headers();
  header.append("Content-Type","application/json")
  var raw=JSON.stringify({
    "text_to_summarize": text,
  })

  var requestOptions = {
    method: 'POST',
    headers: header,
    body: raw,
    redirect: 'follow'
  };

  fetch('/summarize', requestOptions)
  .then(response => response.text()) 
  .then(summary => {
    
    summaryTextArea.value = summary;

    
    submitButton.classList.remove("submit-button--loading");
  })
  .catch(error => {
    console.log(error.message);
  });

  
  
}