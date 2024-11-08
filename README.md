# Notion_Integration :
Usefull Notion Template to ease your work.


## Converter :
Because Americans are not built like us (and for sure don't think like us),  we need a quick way to translate feet in meter, pound in kg or even °F in °C.
This first component is a Unit converter slightly modified from Jenjen's one ([@jenjen9](https://codepen.io/jenjen9)).
You can easily convert :
* length
* mass
* volume
* temperature
* speed
* time

Just copy-paste the following URL in notion and chose embedded to create the widget :
https://hugo66297.github.io/Notion_Integration/Converter/index.html

### Changelog :
From Jenjen's one, I've improved :

*V1 - fully functional*
* The style, by adding many colors to improve the HMI,
* Add titles for each sections, to know on wich page you are,
* Highlight the most used units. 

## Password Generator :
Because you need strong, unique and secure password, here is a fullly random password generator who can help you in your daily work. Add it into your notion dashboard and use it in a few click !
Concerning the style, I took inspiration on Sikriti Dakua's work ([@dev_loop](https://codepen.io/dev_loop)) but change quite a lot of stuff (see changes below).
You can generate random password and choose to have Lowercase, Uppercase, number or even symbol in your password.

*Do not store your password in clear in notion. (encrypt it as soon as possible !)*

Just copy-paste the following URL in notion and chose embedded to create the widget :
https://hugo66297.github.io/Notion_Integration/PswGen/index.html

### Changelog :
What did I change from the original one ?

*V1 - Core of the generator*
* Fonction random improved and BO modified,
* Style and color slightly modified,
* Add the possibility to choose the symbols.

*V2 -additional informations*
* New feature added ! Password info : To know the the strength of your password

*V3 - style improvement*
* Some images are shown if you place your mouse on the strength label (the colorful one). Now, you can visually preview the strength of your password. These images compare your password's strength to your house, guarding against hackers or burglars.
The images are not my design, they come from [Avast](https://www.avast.com/random-password-generator#pc)

*V3.1*
* Just added a new animation when the Generate button is clicked. Check it out!

## Interactive Map :
Here are some clickable map for donjon and dragon, so I can click on the location and be transported to the description of the place. The only thing you'll have to do if you want to use it is to change the URL of the places.
To create the map, I used [Image Map generator](https://www.image-map.net/)

*V1 - Core of clickable map*
* Adding Phandalin map from Lost mine of Phandelver.
https://hugo66297.github.io/Notion_Integration/IntMap/Phandaline/index.html

*V1.1*
* Adding ThunderTree map from Lost mine of Phandelver.
https://hugo66297.github.io/Notion_Integration/IntMap/ThunderTree/index.html

*V1.1.1*
* Bug fix -> target="\_parent" to reload the page"

# Sources :

* [Unit Converter](https://codepen.io/jenjen9/pen/yLBNOKB)
* [Password Generator](https://codepen.io/dev_loop/pen/vYYxvbz)
* [Image Map Generator](https://www.image-map.net/)