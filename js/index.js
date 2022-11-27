var i = 0;
        var w = screen.width * window.devicePixelRatio;
        var h = screen.height * window.devicePixelRatio;

        $.ajax({
            url: "js/data.json",
            dataType: "text",
            success: function (response) {
                data = JSON.parse(response);
                show(i);

                $('#downloadAll').click(function (e) {
                    i = 0;
                    let x = setInterval(() => {
                        show(i++, true);
                        if (i == 98) clearInterval(x);
                    }, 200);
                });

                $('.prev').click(function (e) {
                    show(i > 0 ? i -= 1 : i = 98);
                });

                var isPlaying = false;
                var c;

                $('.play').click(function (e) {
                    if (isPlaying) {
                        clearInterval(c);
                    } else {
                        c = setInterval(() => {
                            show(i += 1);
                            if (i == 98) i = 0;
                        }, 4000);
                    }

                    $('.playBtn').toggleClass('fa-play fa-pause');
                    isPlaying = !isPlaying;
                });

                $('.next').click(function (e) {
                    show(i < 98 ? i += 1 : i = 0);
                });

                function show(index, save) {
                    $('h1').text(data[index].Name);
                    $('h2').text(data[index].Transliteration);
                    $('p').text(data[index].Meaning);
                    if (save) download(index);
                }
            }
        });

        function download(index = i) {
            $('nav, .controls').hide();
            html2canvas(document.body, {
                width: w,
                height: h,
                windowWidth: w,
                windowHeight: h,
            }).then(canvas => {
                canvas.toBlob(function (blob) {
                    saveAs(blob, `name ${index+1}.png`);
                });
            });
            $('nav, .controls').show();
        }

        $(document).ready(function () {
            $('#mode').change(function () {
                if (!localStorage.getItem('theme')) {
                    $(':root').css({
                        '--text': '#111',
                        '--btn': 'wheat',
                        '--bg': 'radial-gradient(circle, white, wheat)',
                    });
                    localStorage.setItem('theme', 'light');
                } else {
                    $(':root').css({
                        '--text': '#555',
                        '--btn': '#111',
                        '--bg': 'url("../img/bg.png")',
                    });
                    localStorage.removeItem('theme');
                }
            });

            $('#trans').change(function () {
                if (!localStorage.getItem('trans')) {
                    localStorage.setItem('trans', 'true');
                } else {
                    localStorage.removeItem('trans');
                }
                $('h2').toggleClass('hide');
            });
            
            if (localStorage.getItem('theme')) {
                $(':root').css({
                    '--text': '#111',
                    '--btn': 'wheat',
                    '--bg': 'radial-gradient(circle, white, wheat)',
                });
                $('#mode').attr("checked",true);
            }
            
            if (localStorage.getItem('trans')) {
                $('h2').toggleClass('hide');
                $('#trans').attr("checked",true);
            }
        });