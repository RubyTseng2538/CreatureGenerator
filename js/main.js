let Strength;
let Dexterity;
let Constitution;

function slider(){
    document.getElementById("StrengthSlide").addEventListener("mousemove", function(){
        Strength = this.value;
        document.getElementById("StrengthText").innerHTML = "Strength: "+ Strength.toString();
    })
    document.getElementById("DexteritySlide").addEventListener("mousemove", function(){
        Dexterity = this.value;
        document.getElementById("DexterityText").innerHTML = "Dexterity: "+ Dexterity.toString();
    })
    document.getElementById("ConstitutionSlide").addEventListener("mousemove", function(){
        Constitution = this.value;
        document.getElementById("ConstitutionText").innerHTML = "Constitution: "+ Constitution.toString();
    })
}

function reroll(){
    Strength = Math.floor(Math.random()*14)+1;
    Dexterity = Math.floor(Math.random()*14)+1;
    Constitution = Math.floor(Math.random()*14)+1;

    document.getElementById("StrengthSlide").value = Strength;
    document.getElementById("StrengthText").innerHTML = "Strength: "+ Strength.toString();
    document.getElementById("DexteritySlide").value = Dexterity;
    document.getElementById("DexterityText").innerHTML = "Dexterity: "+ Dexterity.toString();
    document.getElementById("ConstitutionSlide").value = Constitution;
    document.getElementById("ConstitutionText").innerHTML = "Constitution: "+ Constitution.toString();
}

function main(){
    slider();
    document.getElementById("reroll").onclick = function(){reroll()};
}