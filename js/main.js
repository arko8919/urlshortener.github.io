"use strict";

$(document).ready(function () {

    var apiKey = "AIzaSyC9WXiY77CaOj3XDr1H4skAIhnM24vIEIA"; // My Google API KEY
    var url = "https://www.googleapis.com/urlshortener/v1/url"; //

    $("#expand").click(function () {
        $("#response").empty(); // Clean Field
        expand();
        return false;
    });

    $("#shorten").click(function () {
        $("#response").empty(); // Clean Field
        shorten();
        return false;
    });

    $(".copyButton").click(function () {
        copyToClipboard(".createdElement");
        return false;
    });

    function expand() {
        var urlToExpand = url + "?key=" + apiKey + "&shortUrl=" + $("#input").val();

        $.getJSON(urlToExpand, function (response) {
            $("#response").append("<span class=\"createdElement\">" + response.longUrl + "</span>");
        });
    }

    function shorten() {
        var urlWithKey = url + "?key=" + apiKey;
        var urlToShorten = $("#input").val();

        $.post({
            url: urlWithKey,
            data: JSON.stringify({ longUrl: urlToShorten }),
            dataType: "json",
            contentType: "application/json",

            success: function success(response) {
                $("#response").append("<span class=\"createdElement\">" + response.id + "</span>");
            },
            error: function error(jqXHR, status, errorThrown) {
                console.log(jqXHR);
            }
        });
    }

    function copyToClipboard(element) {
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
});