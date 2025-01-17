export const Prompt = `{
    "totalDuration": 10,
    "frameList": [
      {
    image: "/footage.png",
    text: "Exciting",
    textColor: "black",
    fontSize: 40,
    fontFamily:'Bungee',
    duration: 2,
    Background:'transparent',
    bgColor:'white',
    animation:'None'
    "sticker": "https://fonts.gstatic.com/s/e/notoemoji/latest/1f389/512.gif",
    "stickerSize": 0
      }],
  "selectedFrame": 0,
    "music": "audio1.mp3"
  }, Depends on providerr JSON data, generate Text Promo with emoji video on topic :{userTopic}, totalDuration of video is {userDuration} seconds and set image as "image": "/footage.png", keep 1 to 2 words  and 1 or 1.5 seconds of duration for each frame and give do not add same bgColor and textColor and fontFamily select between (Outfit, Bungee,Anton,Rowdies) Also Can add gradientColor to bgColor field when needed , Select the animation option from (zoomIn,zoomOut,slideIn,slideOut,slideUp,slideDown,wobble,bounce,fadeIn,fadeOut)  . Give me response in JSON format only `;
