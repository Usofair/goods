    // ---------- Глобальные переменные ------------ //

    {
        var targetWindows = [];
        var commWindow = 0;
        var giftWindow = 0;
        var timersOpen = [],
            timersClose = [],
            timersFind = [];
        var timerID = 0;
        var startTimer = 0;
        var instTimer = 0;
        var n = 0;
        var giftsArray = [];
        var showChecker = 0;
        var version = '3.1';
        var siteTitle = '';
        var instWindow = 0;
        var workTime = 0;
        var masterMode = 0;
        var spaunID = 0;
    }   

    // ---------- Главные окна ------------ //

    {
        var giftWindow = window.open('https://rpgtop.su', 'popup2', 'width=64,height=48');
        giftWindow.moveTo(0,1050);
        giftWindow.resizeTo(0,0);
        var instActivation = window.open('https://rpgtop.su', 'popup1', 'width=64,height=48');
        instActivation.moveTo(0,1050);
        instActivation.resizeTo(0,0);
        var spaunWindow = 0;
    }    

    // ---------- ФУНКЦИИ ------------ //

    {
        var findGifts = function(winWork, curSite) {
            if (showChecker == 0) showAll();
            giftsArray[curSite].numberText.innerText = curSite+1;
            giftsArray[curSite].hrefText.innerText = targetWindows[curSite];
            giftsArray[curSite].nameText.innerText = winWork.document.title.slice(16,-10);
            giftsArray[curSite].nameText.style.textIndent = '10px';
            if ((winWork.document)&&(winWork.document.body)) {
                var gifts = winWork.document.body.querySelectorAll('.gift a'),
                    giftImgs = winWork.document.body.querySelectorAll('.gift img');
                var siteID = winWork.location.href.match(/\d+/)[0];
                if (masterMode == 1) {
                    checkSpaun(siteID, winWork);
                }                
            } 
            else {
                console.warn('Загрузка страницы не успела завершиться до начала работы скрипта! Во избежание поломки работы скрипта данная страница будет опущена.');
                return false;
            }
            for (var key in giftsArray[curSite].giftsCount) {
                giftsArray[curSite].wrapper.removeChild(giftsArray[curSite].giftsCount[key].wrapper);
            }
            giftsArray[curSite].giftsCount = {};
            for (var i = 0; i < giftImgs.length; i++) {
                (function(i){
                        if (giftImgs[i].alt != '')	{
                            console.log(giftImgs[i].alt);
                            var giftBox = giftImgs[i].alt,
                                giftName = giftImgs[i].alt;
                            if (giftsArray[curSite].giftsCount[giftBox]) {
                                giftsArray[curSite].giftsCount[giftBox][giftName]++;
                                giftsArray[curSite].giftsCount[giftBox].wrapper.innerText = giftName + ': ' + giftsArray[curSite].giftsCount[giftBox][giftName];
                            } else {
                                giftsArray[curSite].giftsCount[giftBox] = {};  
                                giftsArray[curSite].giftsCount[giftBox].wrapper = document.createElement('p');
                                giftsArray[curSite].giftsCount[giftBox].wrapper.style.textIndent = '0px';
                                giftsArray[curSite].giftsCount[giftBox].wrapper.style.width = '100%';
                                giftsArray[curSite].giftsCount[giftBox].wrapper.style.textAlign = 'center';
                                giftsArray[curSite].wrapper.appendChild(giftsArray[curSite].giftsCount[giftBox].wrapper);
                                giftsArray[curSite].giftsCount[giftBox][giftName] = 1;                               
                                giftsArray[curSite].giftsCount[giftBox].wrapper.innerText = giftName + ': ' + giftsArray[curSite].giftsCount[giftBox][giftName];
                            }
                        }
                })(i);
            }
            if (gifts.length != 0) {
                console.log('Сайт ' + winWork.document.title.slice(16,-10));
                for (var k = 0; k < gifts.length; k++) {
                    (function(k){
                        if (k == 0) {
                            gifts[k].click();
                            console.warn('Собран 1-й предмет: ' + gifts[k].children[0].alt + ' на сайте ' + winWork.document.title.slice(16,-10));
                        }
                        else {
                            if (k < 10) {
                                if ((winWork.document) && (winWork.document.body)) {
                                    setTimeout(function(){
                                        winWork.document.body.appendChild(gifts[k]);
                                        console.log('Добавлен ' + (k+1) + ' предмет: ' + gifts[k].children[0].alt);
                                    }, 900*k);
                                    setTimeout(function(){
                                        gifts[k].click();
                                        console.warn('Собран ' + (k+1) + ' предмет: ' + gifts[k].children[0].alt);
                                    }, 900*k+20); 
                                } else {
                                    console.log('Загрузка страницы не успела за скриптом!. Предмет будет пропущен во избежание нарушений работы скрипта.');
                                }
                            } else {
                                console.log('Переполнение стэка на сайте ' + winWork.document.title.slice(16,-10) + '. ' + gifts[k].children[0].alt + ' будет подобран при следующем проходе');
                            }
                        }
                    })(k);
                }
            }
        };
        function checkSpaun(siteID, winWork) {
            var spauners = winWork.document.querySelectorAll('.gift span img');
            var siteName = winWork.document.title.slice(16,-10);
            console.log('На сайте ' + siteName + ' установлено спаунеров: ' + spauners.length + ' шт.');
            if (spauners.length < 3) setSpauner(siteID, spauners.length, siteName);
        };
        function setSpauner(siteID, spaunersNumb, siteName) {
            var addSpauners = 3 - spaunersNumb;
            for (var i = 0; i < addSpauners; i++) {
                spaunWindow.location.href = 'https://rpgtop.su/cgi-bin/m.cgi?a=spawns&id=' + spaunID + '&site=' + siteID + '&ver=on';
                console.warn('На сайте ' + siteName + ' установлен спаунер!');
            }            
        }
        function addSite(href) {
            targetWindows[n] = href;
            giftsArray[n] = {};
            giftsArray[n].wrapper = document.createElement('div');
            giftsArray[n].wrapper.style.margin = '2px auto';
            giftsArray[n].wrapper.style.textAlign = 'center';
            giftsArray[n].wrapper.style.width = 'auto';
            giftsArray[n].number = document.createElement('div');
            giftsArray[n].number.style.display = 'inline-block';
            giftsArray[n].number.style.textAlign = 'center';
            giftsArray[n].href = document.createElement('div');
            giftsArray[n].href.style.display = 'inline-block';
            giftsArray[n].href.style.textAlign = 'center';
            giftsArray[n].name = document.createElement('div');
            giftsArray[n].name.style.display = 'inline-block';
            giftsArray[n].name.style.textAlign = 'center';  
            if (showChecker == 1) showSite(n);
            n++;                                 
            workTime = targetWindows.length*12.5;
        }
        function digg() {
            if (targetWindows.length > 75) {
                console.error('ВНИМАНИЕ!');
                console.warn('Добавлено слишком большое число страниц! Общее количество: ' + targetWindows.length + ' шт. Допустимое количество - 75 страниц.');
                console.warn('Потребуется больше 15 минут, чтобы просмотреть их все. Пожалуйста, удалите лишние страницы и нажмите кнопку "Start".');
                return false;
            }
            for (var i = 0; i < targetWindows.length; i++) {
                (function(i){                
                    timersOpen[i] = setTimeout(function(){ 
                        console.log('Открывается ' + (i+1) + ' сайт ');
                        giftWindow.location.href = targetWindows[i];
                    }, 12500*i);
                    timersFind[i] = setTimeout(function(curSite){
                        console.log('Открыт сайт ' + giftWindow.document.title.slice(16,-10));
                        siteTitle = giftWindow.document.title.slice(16,-10);
                        findGifts(giftWindow, i);
                    }, 12500*i+2000);
                })(i);
            }
        }
        function removeSite(number) {
            var num = number-1;
            targetWindows.splice(num,1);
            timersOpen.splice(num,1);
            timersFind.splice(num,1);
            timersClose.splice(num,1);
            for (var key in giftsArray[num].giftsCount) {
                giftsArray[num].wrapper.removeChild(giftsArray[num].giftsCount[key].wrapper);
            }
            giftsArray[num].name.removeChild(giftsArray[num].nameText);
            giftsArray[num].wrapper.removeChild(giftsArray[num].name);
            giftsArray[num].href.removeChild(giftsArray[num].hrefText);
            giftsArray[num].wrapper.removeChild(giftsArray[num].href);
            giftsArray[num].number.removeChild(giftsArray[num].numberText);
            giftsArray[num].wrapper.removeChild(giftsArray[num].number);
            results.removeChild(giftsArray[num].wrapper);
            giftsArray.splice(num,1);
            n--;
            for (var i = 0; i < targetWindows.length; i++) {
                giftsArray[i].numberText.innerText = i+1;
            }        
            stopDigg();
            console.warn('Все функции остановлены! Нажмите START снова!');
            workTime = targetWindows.length*12.5;
        }
        function showAll() {
            showChecker = 1;
            for(var j = 0; j < targetWindows.length; j++) {
                var curSite = j;
                results.appendChild(giftsArray[curSite].wrapper);
                giftsArray[curSite].wrapper.appendChild(giftsArray[curSite].number);
                giftsArray[curSite].numberText = document.createElement('p');            
                giftsArray[curSite].number.appendChild(giftsArray[curSite].numberText);
                giftsArray[curSite].numberText.style.display = 'inline';
                giftsArray[curSite].numberText.style.paddingRight = '10px';
                giftsArray[curSite].numberText.innerText = curSite+1;
                giftsArray[curSite].wrapper.appendChild(giftsArray[curSite].href);
                giftsArray[curSite].hrefText = document.createElement('a');
                giftsArray[curSite].href.appendChild(giftsArray[curSite].hrefText);
                giftsArray[curSite].hrefText.href = targetWindows[j];
                giftsArray[curSite].hrefText.innerText = targetWindows[j];
                giftsArray[curSite].wrapper.appendChild(giftsArray[curSite].name);
                giftsArray[curSite].nameText = document.createElement('p'); 
                giftsArray[curSite].name.appendChild(giftsArray[curSite].nameText);
                giftsArray[curSite].nameText.innerText = '';
                console.log((j+1) + ': ' + targetWindows[j]);
            }
        }        
        function showSite(n){
            var curSite = n;
            results.appendChild(giftsArray[curSite].wrapper);
            giftsArray[curSite].wrapper.appendChild(giftsArray[curSite].number);
            giftsArray[curSite].numberText = document.createElement('p');            
            giftsArray[curSite].number.appendChild(giftsArray[curSite].numberText);
            giftsArray[curSite].numberText.style.display = 'inline';
            giftsArray[curSite].numberText.style.paddingRight = '10px';
            giftsArray[curSite].numberText.innerText = curSite+1;
            giftsArray[curSite].wrapper.appendChild(giftsArray[curSite].href);
            giftsArray[curSite].hrefText = document.createElement('a');
            giftsArray[curSite].href.appendChild(giftsArray[curSite].hrefText);
            giftsArray[curSite].hrefText.href = targetWindows[n];
            giftsArray[curSite].hrefText.innerText = targetWindows[n];
            giftsArray[curSite].wrapper.appendChild(giftsArray[curSite].name);
            giftsArray[curSite].nameText = document.createElement('p'); 
            giftsArray[curSite].name.appendChild(giftsArray[curSite].nameText);
            giftsArray[curSite].nameText.innerText = '';
            console.log((n+1) + ': ' + targetWindows[n]);
        };
        function activateInst() {
           instActivation.location.href = instHref;
           setTimeout(function(){
              var checker = instActivation.document.querySelector('form[name="confirm"]');
              checker.querySelector('label').click();
              checker.querySelector('a').click();
           }, 10000);
        }
        function checkInst() {
           if (instHref == '') {
               console.warn('Нет ссылки на инструмент! Работа будет продолжена без инструмента.');
               checkInst = function(){
                   console.log('Инструмент отключен');
               };
               instActivation.close();
               return false;
           }
           if (instActivation.document.querySelector('b.warn')) {
              instValue = +instActivation.document.querySelector('b.warn').innerText;
              if ((instValue == 0) || (isNaN(instValue))) {
                 console.log('Инструмент закончился');
                 activateInst();
              } else {
                  console.warn('Проверка инструмента завершена! Остаток прочности: ' + instValue);
              }
           } else {
              console.log('Инструмент закончился');
              activateInst();
           }
        }   
        function stopDigg() {
            if (targetWindows.length > 0) {
                for (var i = 0; i < targetWindows.length; i++) {
                    clearTimeout(timersOpen[i]);
                    clearTimeout(timersFind[i]);
                    clearTimeout(timersClose[i]);
                }
            }
            if (timerID) clearInterval(timerID);
            if (startTimer) clearTimeout(startTimer);
            if (instTimer) clearInterval(instTimer);
        };
    }  

    // ---------- Внешний вид ------------ //

    {

    // ---------- Переменные ------------ //

    {
        var container = document.querySelector('.container');
        var topBrand = document.querySelector('#top_brand');
        var merch1 = document.querySelector('.android');
        var merch2 = document.querySelector('.reclama468');
        var nav = container.querySelector('#nav_bar');
        var but = document.createElement('button');
        var area = document.createElement('textarea');
        var spaunerInput = document.createElement('input');
        var spaunerCheck = document.createElement('input');
        spaunerCheck.type = 'checkbox';
        spaunerCheck.checked = '';
        var checkBoxText = document.createElement('span');
        var logo = document.querySelector('#logo');
        var stopBtn = document.createElement('button');
        var clearBtn = document.createElement('button');
        var starBtn = document.createElement('button');
        var showBtn = document.createElement('button');
        var clearInput = document.createElement('input');
        var wrapper = document.createElement('div');
        var title = document.createElement('p');
        var profile = document.createElement('input');
        var inst = document.createElement('input');
        var profileHref = '';
        var inventory = 0;
        var instHref = '';
        var instValue = 0; 
        var results = document.createElement('div');
    }

    // ---------- Главный блок ------------ //

    {
        logo.parentNode.removeChild(logo);
        topBrand.style.background = 'none';
        merch1.style.display = 'none';
        merch2.style.display = 'none';

        container.insertBefore(wrapper, nav);
        container.style.paddingTop = '30px';

        wrapper.style.width = '90%';
        wrapper.style.margin = '30px auto';
        wrapper.style.padding = '25px';
        wrapper.style.textAlign = 'center';
        wrapper.style.background = 'linear-gradient(#e8c77b, #f1d490)';
        wrapper.style.boxShadow = 'inset 1px 1px 0px #f1d490, 0px 2px 5px rgba(0, 0, 0, 0.5)';
        wrapper.style.borderRadius = '5px';
    }

    // ---------- Заголовок ------------ //

    {
        wrapper.appendChild(title);
        title.innerText = 'Digger-Master v ' + version;
        title.style.fontFamily = 'PTSansR';
        title.style.fontSize = '18px';
        title.style.color = '#2c1910';
        title.style.fontWeight = 'bold';
        title.style.textAlign = 'center';
        title.style.marginBottom = '25px';
    }

    // ---------- Ввод ссылок ------------ //

    {
        wrapper.appendChild(area);
        area.style.display = 'block';
        area.style.margin = '10px auto';
        area.style.border = '1px solid #482d21';
        area.style.padding = '0px 5px 0px 5px';
        area.style.fontSize = '14px';
        area.style.font = 'PTSansR';
        area.style.color = '#351f16';
        area.style.height = '40px';
        area.style.boxShadow = 'inset -1px -1px 0px white';
        area.style.textShadow = '0px 1px 0px white';
        area.style.background = 'linear-gradient(#d2d2d2, #ededed)';
        area.style.textAlign = 'center';
        area.style.outline = 'none';
    }

    // ---------- Кнопка добавить сайты ------------ //

    {
        wrapper.appendChild(but);
        but.innerText = 'Add sites';
        but.style.display = 'block';
        but.style.margin = '10px auto';
        but.style.fontSize = '14px';
        but.style.color = '#bca393';
        but.style.background = 'linear-gradient(#644232, #523527)';
        but.style.padding = '0px 15px 0px 15px';
        but.style.border = '1px solid #482e22';
        but.style.boxShadow = 'inset 0px 1px 0px #866555';
        but.style.borderRadius = '5px';
        but.style.font = 'PTSansR';
        but.style.outline = 'none';
        but.addEventListener('mouseover', function(){
            but.style.background = 'linear-gradient(#7b513e, #644130)';
        });
        but.addEventListener('mouseout', function(){
            but.style.background = 'linear-gradient(#644232, #523527)';
        });
        but.addEventListener('mousedown', function(){
            but.style.background = 'linear-gradient(#523527, #644232)';
        });
        but.addEventListener('mouseup', function(){
            but.style.background = 'linear-gradient(#644232, #523527)';
        });
    }
        
    // ---------- Инпут спаунера ------------ //

    {
        wrapper.appendChild(spaunerInput);
        spaunerInput.style.display = 'block';
        spaunerInput.style.margin = '10px auto';
        spaunerInput.style.textAlign = 'center';
        spaunerInput.style.border = '1px solid #482d21';
        spaunerInput.style.padding = '0px 5px 0px 5px';
        spaunerInput.style.fontSize = '14px';
        spaunerInput.style.font = 'PTSansR';
        spaunerInput.style.color = '#351f16';
        spaunerInput.style.height = '23px';
        spaunerInput.style.boxShadow = 'inset -1px -1px 0px white';
        spaunerInput.style.textShadow = '0px 1px 0px white';
        spaunerInput.style.background = 'linear-gradient(#d2d2d2, #ededed)';
        spaunerInput.style.width = '500px';
        spaunerInput.placeholder = 'Add spauner activation href';
        spaunerInput.style.outline = 'none';
        spaunerInput.addEventListener('change', function(){
            instHref = inst.value;
        });
    }
        
    // ---------- Чекбокс ------------ //
        
    {
        wrapper.appendChild(spaunerCheck);
        wrapper.appendChild(checkBoxText);
        checkBoxText.innerText = 'Ставить спаунеры';
    }    
        
    // ---------- Кнопка показать сайты ------------ //

    {
        wrapper.appendChild(showBtn);
        showBtn.innerText = 'Show all';
        showBtn.style.display = 'block';
        showBtn.style.margin = '10px auto';
        showBtn.style.fontSize = '14px';
        showBtn.style.color = '#bca393';
        showBtn.style.background = 'linear-gradient(#644232, #523527)';
        showBtn.style.padding = '0px 15px 0px 15px';
        showBtn.style.border = '1px solid #482e22';
        showBtn.style.boxShadow = 'inset 0px 1px 0px #866555';
        showBtn.style.borderRadius = '5px';
        showBtn.style.font = 'PTSansR';
        showBtn.style.outline = 'none';
        showBtn.addEventListener('mouseover', function(){
            showBtn.style.background = 'linear-gradient(#7b513e, #644130)';
        });
        showBtn.addEventListener('mouseout', function(){
            showBtn.style.background = 'linear-gradient(#644232, #523527)';
        });
        showBtn.addEventListener('mousedown', function(){
            showBtn.style.background = 'linear-gradient(#523527, #644232)';
        });
        showBtn.addEventListener('mouseup', function(){
            showBtn.style.background = 'linear-gradient(#644232, #523527)';
        });
    }

    // ---------- Кнопка стоп ------------ //

    {
        wrapper.appendChild(stopBtn);
        stopBtn.innerText = 'Stop';
        stopBtn.style.display = 'block';
        stopBtn.style.margin = '10px auto';
        stopBtn.style.fontSize = '14px';
        stopBtn.style.color = '#bca393';
        stopBtn.style.background = 'linear-gradient(#644232, #523527)';
        stopBtn.style.padding = '0px 15px 0px 15px';
        stopBtn.style.border = '1px solid #482e22';
        stopBtn.style.boxShadow = 'inset 0px 1px 0px #866555';
        stopBtn.style.borderRadius = '5px';
        stopBtn.style.font = 'PTSansR';
        stopBtn.style.outline = 'none';
        stopBtn.addEventListener('mouseover', function(){
            stopBtn.style.background = 'linear-gradient(#7b513e, #644130)';
        });
        stopBtn.addEventListener('mouseout', function(){
            stopBtn.style.background = 'linear-gradient(#644232, #523527)';
        });
        stopBtn.addEventListener('mousedown', function(){
            stopBtn.style.background = 'linear-gradient(#523527, #644232)';
        });
        stopBtn.addEventListener('mouseup', function(){
            stopBtn.style.background = 'linear-gradient(#644232, #523527)';
        });
    }

    // ---------- Инпут удаления сайта ------------ //

    {
        wrapper.appendChild(clearInput);
        clearInput.style.display = 'block';
        clearInput.style.margin = '10px auto';
        clearInput.style.textAlign = 'center';
        clearInput.style.border = '1px solid #482d21';
        clearInput.style.padding = '0px 5px 0px 5px';
        clearInput.style.fontSize = '14px';
        clearInput.style.font = 'PTSansR';
        clearInput.style.color = '#351f16';
        clearInput.style.height = '23px';
        clearInput.style.boxShadow = 'inset -1px -1px 0px white';
        clearInput.style.textShadow = '0px 1px 0px white';
        clearInput.style.background = 'linear-gradient(#d2d2d2, #ededed)';
        clearInput.style.outline = 'none';
        clearInput.placeholder = 'Site number';
    }

    // ---------- Кнопка удаления сайта ------------ //

    {
        wrapper.appendChild(clearBtn);
        clearBtn.innerText = 'Remove this site';
        clearBtn.style.display = 'block';
        clearBtn.style.margin = '10px auto';
        clearBtn.style.fontSize = '14px';
        clearBtn.style.color = '#bca393';
        clearBtn.style.background = 'linear-gradient(#644232, #523527)';
        clearBtn.style.padding = '0px 15px 0px 15px';
        clearBtn.style.border = '1px solid #482e22';
        clearBtn.style.boxShadow = 'inset 0px 1px 0px #866555';
        clearBtn.style.borderRadius = '5px';
        clearBtn.style.font = 'PTSansR';
        clearBtn.style.outline = 'none';
        clearBtn.addEventListener('mouseover', function(){
            clearBtn.style.background = 'linear-gradient(#7b513e, #644130)';
        });
        clearBtn.addEventListener('mouseout', function(){
            clearBtn.style.background = 'linear-gradient(#644232, #523527)';
        });
        clearBtn.addEventListener('mousedown', function(){
            clearBtn.style.background = 'linear-gradient(#523527, #644232)';
        });
        clearBtn.addEventListener('mouseup', function(){
            clearBtn.style.background = 'linear-gradient(#644232, #523527)';
        });     
    }

    // ---------- Инпут профиля ------------ //

    {
        wrapper.appendChild(profile);
        profile.style.display = 'block';
        profile.style.margin = '10px auto';
        profile.style.textAlign = 'center';
        profile.style.border = '1px solid #482d21';
        profile.style.padding = '0px 5px 0px 5px';
        profile.style.fontSize = '14px';
        profile.style.font = 'PTSansR';
        profile.style.color = '#351f16';
        profile.style.height = '23px';
        profile.style.boxShadow = 'inset -1px -1px 0px white';
        profile.style.textShadow = '0px 1px 0px white';
        profile.style.background = 'linear-gradient(#d2d2d2, #ededed)';
        profile.style.width = '500px';
        profile.style.outline = 'none';
        profile.placeholder = 'Add profile href';
        profile.addEventListener('change', function(){
            profileHref = profile.value;
        });
    }

    // ---------- Инпут инструмента ------------ //

    {
        wrapper.appendChild(inst);
        inst.style.display = 'block';
        inst.style.margin = '10px auto';
        inst.style.textAlign = 'center';
        inst.style.border = '1px solid #482d21';
        inst.style.padding = '0px 5px 0px 5px';
        inst.style.fontSize = '14px';
        inst.style.font = 'PTSansR';
        inst.style.color = '#351f16';
        inst.style.height = '23px';
        inst.style.boxShadow = 'inset -1px -1px 0px white';
        inst.style.textShadow = '0px 1px 0px white';
        inst.style.background = 'linear-gradient(#d2d2d2, #ededed)';
        inst.style.width = '500px';
        inst.placeholder = 'Add instrument activation href';
        inst.style.outline = 'none';
        inst.addEventListener('change', function(){
            instHref = inst.value;
        });
    }

    // ---------- Кнопка старта ------------ //  

    {
        wrapper.appendChild(starBtn);
        starBtn.innerText = 'Start';
        starBtn.style.display = 'block';
        starBtn.style.margin = '10px auto';
        starBtn.style.border = '1px solid #513427';
        starBtn.style.padding = '6px 8px 6px 8px';
        starBtn.style.fontSize = '16px';
        starBtn.style.font = 'PTSansR';
        starBtn.style.color = '#eee';
        starBtn.style.outline = 'none';
        starBtn.style.background = 'linear-gradient(#845b47, #654332)';
        starBtn.addEventListener('mouseover', function(){
            starBtn.style.background = 'linear-gradient(#9e6e55, #80543e)';
        });
        starBtn.addEventListener('mouseout', function(){
            starBtn.style.background = 'linear-gradient(#845b47, #654332)';
        });
        starBtn.addEventListener('mousedown', function(){
            starBtn.style.background = 'linear-gradient(#654332, #845b47)';
        });
        starBtn.addEventListener('mouseup', function(){
            starBtn.style.background = 'linear-gradient(#845b47, #654332)';
        });
    }

     // ---------- Блок отображения информации ------------ //    

    {
        container.insertBefore(results, nav);
        results.style.width = '90%';
        results.style.margin = '30px auto';
        results.style.padding = '25px';
        results.style.textAlign = 'center';
        results.style.background = 'linear-gradient(#e8c77b, #f1d490)';
        results.style.boxShadow = 'inset 1px 1px 0px #f1d490, 0px 2px 5px rgba(0, 0, 0, 0.5)';
        results.style.borderRadius = '5px';
    }
        
    }        

    // ---------- Обработчики ------------ //

    {
        var str = 0;
        var hrefArray = 0;
        but.addEventListener('click', function(){
            stopDigg();            
            str = area.value;
            hrefArray = str.match(/https:\/\/\S+/g);
            for (var i = 0; i < hrefArray.length; i++) {
                addSite(hrefArray[i]);
            }
            area.value = '';
            if (hrefArray.length > 0) console.log('Сайты успешно добавлены: ' + hrefArray.length + ' шт.'); 
            console.warn('Все функции остановлены! Нажмите START снова!');   
        });
        stopBtn.addEventListener('click', stopDigg);
        clearBtn.addEventListener('click', function(){
            var number = clearInput.value;
            removeSite(number);
            clearInput.value = '';
        });
        starBtn.addEventListener('click', function(){
            if (spaunerCheck.checked) {
                masterMode = 1;
            } else {
                masterMode = 0;
            }
            if ((masterMode == 1)&&(spaunID == 0)) {
                str = spaunerInput.value;
                spaunID = str.match(/\d+/)[0];
            }
            if ((!spaunWindow)&&(masterMode == 1)) {
                spaunWindow = window.open('https://rpgtop.su', 'popup3', 'width=64,height=48');
                spaunWindow.moveTo(0,1050);
                spaunWindow.resizeTo(0,0);
            }
            startTimer = setTimeout(function(){
                digg();
            }, 4);
                timerID = setInterval(function(){digg();}, (workTime*1000 + 30000));
                setInterval(function(){console.clear();}, 2700000);
                instTimer = setInterval(function(){
                   instActivation.location.href = profileHref;
                   if ((instHref == '') || (profileHref == '')) {
                       console.warn('Ссылки не обнаружены! Новые проверки инструмента будут отключены.');
                       clearInterval(instTimer);
                   } else {
                       setTimeout(function(){
                          checkInst();
                       }, 15000);
                   }                   
                }, 95000);
        });
        showBtn.addEventListener('click', function(){
            showAll();
        })
    }