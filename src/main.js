$(document).ready(() => {

    const apiKey = "AIzaSyC9WXiY77CaOj3XDr1H4skAIhnM24vIEIA"; // My Google API KEY
    const url = "https://www.googleapis.com/urlshortener/v1/url"; //

    $("#expand").click(() => {
        $("#response").empty(); // Clean Field
        expand();
        return false;
    });

    $("#shorten").click(() => {
        $("#response").empty(); // Clean Field
        shorten();
        return false;
    });

    $(".copyButton").click(() => {
        copyToClipboard(".createdElement");
        return false;
    });

    function expand() {
        const urlToExpand = url + "?key=" + apiKey + "&shortUrl=" + $("#input").val();

        $.getJSON(urlToExpand, response => {
            $("#response").append(`<span class="createdElement">${response.longUrl}</span>`);
        });
    }

    function shorten() {
        const urlWithKey = url + "?key=" + apiKey;
        const urlToShorten = $("#input").val();

        $.post({
            url: urlWithKey,
            data: JSON.stringify({longUrl: urlToShorten}),
            dataType: "json",
            contentType: "application/json",

            success(response) {
                $("#response").append(`<span class="createdElement">${response.id}</span>`);
            },

            error(jqXHR, status, errorThrown) {
                console.log(jqXHR);
            }
        })
    }

    function copyToClipboard(element) {
        const $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }
});