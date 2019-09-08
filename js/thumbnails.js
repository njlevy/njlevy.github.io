$(document).ready(function () {
    var section = document.getElementById('main');
    var container = document.getElementById('foodMenu');
    var videoURL = $(".video iframe");


    function parseURL(url) {
        // - Supported YouTube URL formats:
        //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
        //   - http://youtu.be/My2FRPA3Gf8
        //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
        //   - https://m.youtube.com/watch?v=My2FRPA3Gf8
        // - Supported Vimeo URL formats:
        //   - http://vimeo.com/25451551
        //   - http://player.vimeo.com/video/25451551
        // - Also supports relative URLs:
        //   - //player.vimeo.com/video/25451551

        url.match(/(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

        if (RegExp.$3.indexOf('youtube') > -1) {
            var type = 'youtube';
        } else if (RegExp.$3.indexOf('vimeo') > -1) {
            var type = 'vimeo';
        }

        return {
            type: type,
            id: RegExp.$6
        };
    }

    var appendThumb = (function (e) {
        var videoDetails = parseURL(videoURL.attr('src'));

        var videoType = videoDetails.type;
        var videoID = videoDetails.id;

        if (videoType == 'youtube') {
            console.log("yt");
            var thumbSRC = 'https://img.youtube.com/vi/' + videoID + '/maxresdefault.jpg';
            console.log(thumbSRC);
        } else if (videoType == 'vimeo') {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://vimeo.com/api/v2/video/" + videoID + ".json", true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = xhr.responseText;
                        var parsedData = JSON.parse(data);
                        thumbSRClarge = parsedData[0].thumbnail_large;
                        // split url of large thumbnail at 640
                        thumbSplit = thumbSRClarge.split(/\d{3}(?=.jpg)/);
                        // add 1280x720 to parts and get bigger thumbnail
                        thumbSRC = thumbSplit[0] + '1280x720' + thumbSplit[1];
                        $("img.yfb-thumbnail").attr("src", thumbSRC);

                    } else {
                        console.error(xhr.statusText);
                    }
                }
            };
            xhr.onerror = function (e) {
                console.error(xhr.statusText);
            };
            xhr.send(null);
        }

        //        // Clear content of container
        //        this.innerHTML = "";
        // Set headline
        // var headline = document.createElement('h2');
        if ((videoType == 'youtube') || (videoType == 'vimeo')) {

        }


        // Set image
        if ((videoType == 'youtube') || (videoType == 'vimeo')) {
            //            var thumbIMG = document.createElement('img');
            //            if (videoType == 'youtube') {
            //                thumbIMG.src = thumbSRC;
            //            }
            $("#thumbnail").attr("src", thumbSRC);


        }


        //
        //        // Append Headline to the container
        //        container.appendChild(this);
        //        //        // Append link containing image to the container
        //        //        if ((videoType == 'youtube') || (videoType == 'vimeo')) {
        //        //            container.appendChild(thumbIMG);
        //        //        }
        //        // Append download-link
        //        container.appendChild(thumbLINK);
        //        // Append paragraph to the container
        //        container.appendChild(paragraph);
        //        // Append container to the section
        //        section.appendChild(container);
        //        // prevent the form to submit and reload page
        //        e.preventDefault();
    });

    appendThumb();

});