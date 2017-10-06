/*
EMAIL TEMPLATE BUILDER FOR RAKUTEN v1.0
By: Erwin Hilario
*/


$(document).ready(function() {
  // adding Title credit
  var title ="Rakuten Email template builder | by: Erwin Hilario";
  $("title").text(title);

  // when clicking "Generate Code" button
  $(".generateCode").click(function() {
    initEntries();
    generateContent();
    prepareDownloadable();
  });

  // when clicking "Download Code" button
  $(".downloadCode").click(function() {
    var container = document.querySelector('textarea');
    var anchor = document.querySelector('a');
    anchor.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(container.value);
    anchor.download = 'email-to-affiliate.html';
  });

});

function initEntries() {
  // initialized data entered in the text boxes
  offerID = $(".offerID").val();
  textLinkID = $(".textLinkID").val();
  bannerID = $(".bannerID").val();
  withBanner = $(".withBanner option:selected").val();
  textContent = $(".textContent").val();
  bannerURL = $(".bannerURL").val();
  inclusiveDate = $(".inclusiveDate").val();
}

function generateContent() {
  // generate content codes using the data entered, concatenating codes together
  var textLinkHTML = '<a href="http://click.linksynergy.com/fs-bin/click?id=[SITE.CODE]&offerid='+offerID+'.'+textLinkID+'&type=3&subid=0">'+textContent+'</a> <IMG border="0" width="1" height="1" src="http://ad.linksynergy.com/fs-bin/show?id=[SITE.CODE]&bids='+offerID+'.'+textLinkID+'&type=3&subid=0">';
  var bannerHTML = '<a href="http://click.linksynergy.com/fs-bin/click?id=[SITE.CODE]&offerid='+offerID+'.'+bannerID+'&type=4&subid=0"><IMG alt="'+textContent+'" border="0" src="'+bannerURL+'"></a> <IMG border="0" width="1" height="1" src="http://ad.linksynergy.com/fs-bin/show?id=[SITE.CODE]&bids='+offerID+'.'+bannerID+'&type=4&subid=0">';
  var codeFormatStart = '<br /><span style="color: blue; font-weight: bold;">';
  var codeFormatEnd = '</span>';
  var textLinkHTMLCodeStart = HtmlEncode('<a href="http://click.linksynergy.com/fs-bin/click?id=[SITE.CODE]&offerid='+offerID+'.'+textLinkID+'&type=3&subid=0">');

  var textLinkHTMLCodeEnd = HtmlEncode('</a> <IMG border="0" width="1" height="1" src="http://ad.linksynergy.com/fs-bin/show?id=[SITE.CODE]&bids='+offerID+'.'+textLinkID+'&type=3&subid=0">');
  var textLinkHTMLCode = textLinkHTMLCodeStart + codeFormatStart + textContent + codeFormatEnd + textLinkHTMLCodeEnd;
  var bannerHTMLCodeStart = HtmlEncode('<a href="http://click.linksynergy.com/fs-bin/click?id=[SITE.CODE]&offerid='+offerID+'.'+bannerID+'&type=4&subid=0"><IMG alt="');
  var bannerHTMLCodeEnd = HtmlEncode('" border="0" src="'+bannerURL+'"></a> <IMG border="0" width="1" height="1" src="http://ad.linksynergy.com/fs-bin/show?id=[SITE.CODE]&bids='+offerID+'.'+bannerID+'&type=4&subid=0">');
  var bannerHTMLCode = bannerHTMLCodeStart  + codeFormatStart + textContent + codeFormatEnd + bannerHTMLCodeEnd;

  // insert concatenated codes to Contents for download
  $(".textLinkHTML").html(textLinkHTML);
  $(".textLinkHTMLCode").html(textLinkHTMLCode);
  $(".inclusiveDate").html(inclusiveDate);
  $(".logo").attr("alt",textContent);

  //check if banner exist and removes banner related codes if no
  if(withBanner == "yes") {
    $(".bannerHTML").html(bannerHTML);
    $(".bannerHTMLCode").html(bannerHTMLCode);
    $("#bannerHTMLCode, .bannerHTML").show();
  } else {
    $("#bannerHTMLCode, .bannerHTML").hide();
  }

  // use to create ampersand codes to display html code
  function HtmlEncode(s) {
    var el = document.createElement("div");
    el.innerText = el.textContent = s;
    s = el.innerHTML;
    return s;
  }

  // displays downloadable and selectable codes, the code preview and the download button
  $(".downloadCode, #downloadableCode, #extractedCode, h2").css("display","block");
}

function prepareDownloadable() {
  var fileName = "email.html";
  downloadInnerHtml(fileName, 'extractedCode', 'text/html');
}

function downloadInnerHtml(fileName, elId, mimeType) {
  var elHtml = document.getElementById(elId).innerHTML;
  var link = $(".downloadCode");//document.createElement('a');
  var coHtml = elHtml.replace(/™/g, '&trade;');
  $("textarea").val(coHtml);
  alert("Code generated!\nPlease click DOWNLOAD CODE button to get generated code.");
}
