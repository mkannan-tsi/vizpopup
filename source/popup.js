// JS for viz pop-up
var viz;
var vizURL = "https://demoapac.tableau.com/t/Presales/views/Superstore_3/Overview?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&Subcategory=";

// Initiate the popping up of the div
function popupViz() {
	$( "#popupDiv" ).popup ("open", {history: false});
}

function popupCloseViz() {
   	location.href = "#";
}
 
// Define the iframe with the second viz, including the contextual filter
function resizeViz(marks) {

	// Determining selection made
	if (marks.length > 0) {
		for (var markIndex=0; markIndex < marks.length; markIndex++) {
			var pairs =	marks[markIndex].getPairs();
			for (var pairIndex=0; pairIndex < pairs.length; pairIndex++) {
				var pair = pairs[pairIndex];
				if (pair.fieldName === "Sub-Category"){
					var finalURL = vizURL + pair.formattedValue;
							        					
					//Cleaning up previous iframe, if it exists
					var iframes = document.querySelectorAll('iframe');
					for (var i = 0; i < iframes.length; i++) {
					    if (iframes[i].id === "vizFrame") {
					    	iframes[i].parentNode.removeChild(iframes[i]);
					    }
					}

					// Creating the new iframe
					var iframe = document.createElement('iframe');
					iframe.frameBorder=0;
					iframe.id="vizFrame";
					iframe.setAttribute("class", "iframeStyle")
					iframe.setAttribute("src", finalURL);
					document.getElementById("popupDiv").appendChild(iframe);
				}
			}
		}
		popupViz();
	}	        		       
}        	

// Initializing base viz
function initViz() {
	console.log (window.location.href);
    var containerDiv = document.getElementById("vizContainer"),
        url = "https://demoapac.tableau.com/t/Presales/views/Action/Dashboard1?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no",
        options = {
            hideTabs: true,
           
            onFirstInteractive: function () {
                listenToMarksSelection();
            }
        };
    viz = new tableau.Viz(containerDiv, url, options);
}

// Retrieving selected mark
function listenToMarksSelection() {
    viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
}

function onMarksSelection(marksEvent) {
return marksEvent.getMarksAsync().then(reportSelectedMarks);
}

function reportSelectedMarks(marks) {
	resizeViz (marks);
}