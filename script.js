 //buttons
    const rbtn = document.getElementById("roll-btn");
    const skipbtn = document.getElementById("skip-btn");
    const acceptbtn = document.getElementById("accept-btn");
    const inventorybtn = document.getElementById("inven-btn");
    let backbtn = document.getElementById("back-btn");
    let backbtn2 = document.getElementById("back-btn2");
    //let plusbtn = document.getElementById("plus");
    let settingbtn = document.getElementById("setting-btn");
    var autorollbtn = document.getElementById("auto-roll")
    //screen
    const pokeimg = document.getElementById("pokemon-img");
    const pokename = document.getElementById("pokemonname");
    const pokerarity = document.getElementById("pokemonraritytext");
    const roll = document.getElementById("rolltext");
    const reddot = document.getElementById("noti");
    const skybg = document.getElementById("sky");
    const bag = document.getElementById("inventory");
    const invscreen = document.getElementById("inventoryscreen");
    const setscreen = document.getElementById("settingscreen")
    var autoskip = document.getElementById("autoskipsetting")

    //somename
    const invtitle = document.getElementById("inventorytitlename");
    const settitle = document.getElementById("settingtitlename");
    const maintitle = document.getElementById("titlename");

    // สร้าง object pokemon
    const pokemons = {
        common: ["Magikarp","Krabby","Doduo","Ponyta","Rattata","Sentret","Natu","Gilgar","Girafarig","Corsola","Whismur","Luvdisc","Happiny",
        "Boldore","Lotad","Marill","Taillow","Wooloo","Chewtle","Yamper","Bellsprout","Geodude","Slowpoke","Magnemite","Grimer","Scraggy",
        "Cubone","Sewaddle","Cottonee","Tirtouga","Minccino","Joltik","Scatterbug","Bergmite","Litten","Cutiefly","Dewpider","Fomantis","Bounsweet","Wimpod","Pikipek","Yungoos","Grubbin",
        "Applin","Sizzlipede","Clobbopus","Hatenna","Impidimp"],

        uncommon: ["Bulbasaur","Charmander","Squirtle","Chikorita","Cyndaquil","Totodile","Treecko","Torchic","Mudkip","Dedenne",
        "Rookidee","Sinistea","Poochyena","Starly","Blipbug","Tentacool","Rhyhorn","Lillipup","Woobat","Sandile","Dwebble","Phantump",
        "Pumpkaboo","Rowlet","Popplio","Silicobra","Arrokuda"],

        rare: ["Snivy","Tepig","Oshawott","Chespin","Fennekin","Froakie","Misdreavus","Gothita","Mareanie","Rockruff","WoChien",
        "Shroomish","Feebas","Trapinch","Machop","Horsea","Snover","Roggenrola","Deerling","Frillish","Klink","Rolycoly","Toxel"],

        epic: ["Pikachu","Ralts","Riolu","Alcremie","Noibat","Tyrunt","Munchlax","Carnivine","Aron","Slakoth","Charcadet","Swinub",
        "Mimikyu","Trubbish","Solosis","Vanillite","Ferroseed","Eelektrik","Salandit","Stufful"],

        ultrarare: ["Goomy","Dratini","Larvitar","Beldum","Deino","Jangmo-o","Dreepy","Gible","Bagon","Frigibax"],

        legendary : ["Articuno","Zapdos","Moltres","Lugia","Ho-Oh","Groudon","Kyogre","Rayquaza","Dialga","Palkia",
        "Giratina","Raikou","Entei","Suicune","Reshiram","Zekrom","Poipole"],

        origin : ["Mew","Mewtwo","Deoxys","Celebi","Jirachi","Meltan","Zygarde","Meloetta","Diancie",],

        secret : ["Arceus","Melmetal","Hoopa","Hoopa(UNBOUND)"]
    }; //สร้างpokemon object อย่าลืมเติม ;

    //สร้างfunction random pokemon อันนี้สร้างเเบบ global สามารถเรียกใช้ที่ไหนก็ได้เพราะคนละscope
    function getRandomPokemon() {
        const randm = Math.random() * 100;//
        let rarity = "";
        if (randm <70) rarity = "common";           // 45%
        else if (randm <85) rarity = "uncommon";    // 30%
        else if (randm <95.39) rarity = "rare";        // 15%
        else if (randm <98.39) rarity = "epic";     // 8.39%
        else if (randm <99.39) rarity = "ultrarare"; // 1%
        else if (randm <99.89) rarity = "legendary";  // 0.5%
        else if (randm <99.99) rarity = "origin";    // 0.1%    
        else rarity = "secret";                     // 0.01%    

    
    const list = pokemons[rarity];
    const pokemon = list[Math.floor(Math.random()* list.length)];
    return {name:pokemon,rarity:rarity};
    }

    //หลักการทำงานคือสุ่ม key(rarityก่อน) เเล้วค่อยสุ่มใน arrayอีกท

    //ทำ autoskip
    function autoskipenable(rarity){
        const checkboxes = document.querySelectorAll(`#autoskipsetting input[type="checkbox"]`);
        for(let checkbox of checkboxes){
            if (checkbox.value.toLowerCase() === rarity.toLowerCase()){
                return checkbox.checked;
            }
        }
        return false;
    }

    //checkสถานะ rollอยู่หรือไม่
    let rolling = false;
    let shadowInterval;
    let shadowTimeout;
    //functionหยุดสุ่ม
    function stopRolling() {
        if (shadowInterval) {
            clearInterval(shadowInterval);
            shadowInterval = null;
        }
        if  (shadowTimeout) {
            clearTimeout(shadowTimeout);
            shadowTimeout = null;
        }
        rolling = false;
    }
    
    //rollbutton
    rbtn.addEventListener("click",function(){
        if (rolling) return; //stopถ้าสุ่มอยู้
        rolling = true; //ถ้าไม่สุ่มให้ true, สุ่มได้

                //hide
        rolltext.style.display = "none"; 
        rbtn.style.display = "none";
        pokename.style.display = "none";
        pokerarity.style.display = "none";
        //show
        pokeimg.style.display = "block";
        
        
        //shadow
        shadowInterval = setInterval(() => {
            const allPokemon = Object.values(pokemons).flat();
            const randomShadow = allPokemon[Math.floor(Math.random()* allPokemon.length)]
            pokeimg.src = `pokemonpic/${randomShadow}.png`;
            pokeimg.style.filter = "brightness(0)";
        }, 50);

        //timeout
        shadowTimeout = setTimeout(() => {
            clearInterval(shadowInterval);
            const result = getRandomPokemon();
            console.log(`You got ${result.name}! (${result.rarity.toUpperCase()})`);

            //show pokemon
            pokeimg.src = `pokemonpic/${result.name}.png`;
            pokeimg.style.filter = "none";
            pokeimg.classList.add("pop");

            pokename.textContent = result.name;
            pokename.style.display = "block";
            pokerarity.textContent = result.rarity.toUpperCase();
            pokerarity.style.display = "block";

            skipbtn.style.display = "inline";
            acceptbtn.style.display = "inline";
            
            //autoskip
            if(autoskipenable(result.rarity)){
                console.log(`Auto-skip ${result.name} (${result.rarity})`);
                skipbtn.click();
            }
            rolling = false;
        }, 2000);
    });

    //remove pop class after animaton
    pokeimg.addEventListener("animationend",()=>{
        pokeimg.classList.remove("pop");
    });

    //autoroll
    let autorollenable = false;
    let autorollinterval;

    function startautoroll(){
        if (autorollinterval) clearInterval(autorollinterval);
        autorollinterval = setInterval(() => {
            if (!rolling && rbtn.style.display !== "none") {
                rbtn.click();
            }
        }, 3000);
    }
    function stopautoroll(){
        if (autorollinterval) {
            clearInterval(autorollinterval);
            autorollinterval = null;
            
        }
    }
    autorollbtn.addEventListener("click",function(){
        autorollenable = !autorollenable;
        autorollbtn.textContent = `AutoRoll : ${autorollenable ? "on" : "off"}`;
        if (autorollenable) {
            startautoroll();
            autorollbtn.style.backgroundColor = "#81D098";
        } else {
            stopautoroll();
            autorollbtn.style.backgroundColor = "#C86057";
        }
    })

    //ปุ่ม accept , skip ,inventory

    skipbtn.addEventListener("click",function(){
        console.log("skipped");
        //return to zero!
        pokeimg.style.display = "none";
        pokename.style.display = "none";
        pokerarity.style.display = "none";
        //roll
        rolltext.style.display = "block";
        rbtn.style.display = "block";
        //ปุ่มgone
        skipbtn.style.display = "none";
        acceptbtn.style.display = "none"; 

    })
    
    acceptbtn.addEventListener("click",function(){
        console.log("accepted");
        //return to zero
        pokeimg.style.display = "none";
        pokename.style.display = "none";
        pokerarity.style.display = "none";
        //roll 
        rolltext.style.display = "block";
        rbtn.style.display = "block";
        //ปุ่มgone
        skipbtn.style.display = "none";
        acceptbtn.style.display = "none";
        //inven
        reddot.style.display = "block";

        const result ={
            name: pokename.textContent,
            rarity: pokerarity.textContent
        };
        const img = document.createElement("img");
        img.src = `pokemonpic/${result.name}.png`;
        img.alt = result.name;
        const grid = document.getElementById("inventorygrid");
        grid.appendChild(img);

        rolling = false;
    })

    inventorybtn.addEventListener("click",function(){
        console.log("inventory viewed");
        //หยุดสุ่มเวลากดปุ่ม
        stopRolling();
        //this world shall perish
        skybg.style.display= "none";
        roll.style.display="none";
        rbtn.style.display="none";
        reddot.style.display = "none";
        skipbtn.style.display = "none";
        acceptbtn.style.display = "none";
        pokeimg.style.display = "none";
        pokename.style.display = "none";
        pokerarity.style.display = "none";
        autorollbtn.style.display = "none";
        setscreen.style.display = "none";
        //ทำให้ปุ่มinventoryหายเวลากดเเล้วขึ้นกากบาท(backinv)
        inventorybtn.style.display ="none";
        //ปุ่ม backsettingหาย กันเวลากดsetting->inventoryเเล้ว backยังยุ
        backbtn2.style.display = "none";

        //GEAR FIFTH! VOHAHAHAH
        invscreen.style.display="block";
        backbtn.style.display="block";
        //plusbtn.style.display="block";
        settingbtn.style.display = "block";

        //try
        maintitle.textContent = "INVENTORY";
    })

    backbtn.addEventListener("click",function(){
        console.log("back");
        //return to zero
        backbtn.style.display = "none";
        invscreen.style.display ="none";
        setscreen.style.display = "none";   
        //roll 
        rolltext.style.display = "block";
        rbtn.style.display = "block";
        skybg.style.display = "flex";
        inventorybtn.style.display = "block";
        autorollbtn.style.display = "block";

        maintitle.textContent = "POKE-RNG"
    })
        backbtn2.addEventListener("click",function(){
        console.log("back");
        //return to zero
        backbtn2.style.display = "none";
        invscreen.style.display ="none";
        setscreen.style.display = "none";   
        //roll 
        rolltext.style.display = "block";
        rbtn.style.display = "block";
        skybg.style.display = "flex";
        inventorybtn.style.display = "block";
        settingbtn.style.display ="block"
        autorollbtn.style.display = "block";

        maintitle.textContent = "POKE-RNG"
    })

    settingbtn.addEventListener("click",function(){
        console.log("setting");
        stopRolling();
        //this world shall perish
        skybg.style.display= "none";
        roll.style.display="none";
        rbtn.style.display="none";
        reddot.style.display = "none";
        skipbtn.style.display = "none";
        acceptbtn.style.display = "none";
        pokeimg.style.display = "none";
        pokename.style.display = "none";
        pokerarity.style.display = "none";
        //plusbtn.style.display="none";
        invscreen.style.display="none";
        settingbtn.style.display ="none";
        autorollbtn.style.display = "none";
        //inv backาหาย
        backbtn.style.display="none";

        //vohaha
        
        setscreen.style.display = "block";
        backbtn2.style.display = "block";
        inventorybtn.style.display = "block";
        autoskip.style.display = "block";

        //try
        maintitle.textContent = "SETTINGS"

    })

  // sound
    const bgm = document.getElementById("bgm");
    const volumeSlider = document.getElementById("volume");

    bgm.play();
    bgm.volume = volumeSlider.value / 400;

    volumeSlider.addEventListener("input", function() {
    bgm.volume = volumeSlider.value / 200; 
    
    
});
