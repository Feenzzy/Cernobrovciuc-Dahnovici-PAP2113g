class Item {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    ishow_img(q) {
        var out = document.getElementById(q);
        out.innerHTML += '<img src="' + this.image + '" alt="' + this.name + '">';
    }

    ishow_name(z) {
        var out = document.getElementById(z);
        out.innerHTML += '<br>#' + this.id + ' ' + this.name + '<br ><div class="red">£' + this.price + '</div';
    }
    ishow_addbtn(u) {
        var out = document.getElementById(u);
        out.innerHTML += '<br><button id="' + this.id + '"display="inline-block" onclick="ids.push(this.id);alert(\'Obiect adaugat!\');localStorage.setItem(\'ids\', JSON.stringify(ids));">Add to cart</button>';
    }
    ishow_rembtn(u) {
        var out = document.getElementById(u);
        out.innerHTML += '<br><button id="' + this.id +'" display="inline-block" onclick="removeById(\'' + this.id + '\');pret_total(\'pret_total\'); localStorage.setItem(\'ids\', JSON.stringify(ids));cart_show(\'x\'); ">Remove from cart</button>';

    }
}
function removeById(value) {
    const index = ids.indexOf(value);
    if (index !== -1) {
        ids.splice(index, 1);
    }
}
var items = [
    new Item("192512", "Carhartt WIP Madison Corduroy Shirt", 65, "shop_data/192512.png"),
    new Item("192651", "Carhartt WIP madison corduroy shirt in green", 120, "shop_data/192651.png"),
    new Item("192742", "Polo Ralph Lauren icon logo herringbone print jersey shirt in grey marl/white", 80, "shop_data/192742.png"),
    new Item("192805", "Selected Homme loose fit jeans in light wash", 64, "shop_data/192805.png"),
    new Item("192829", "ONLY & SONS Edge loose fit carpenter trouser with contrast stitch in black", 39, "shop_data/192829.png"),
    new Item("192851", "ONLY & SONS Edge loose fit carpenter trouser with contrast stitch in brown", 39, "shop_data/192851.png")
];
var ids = [];

function items_show(output) {
    var storedIds = JSON.parse(localStorage.getItem('ids')) || [];
    ids = storedIds;
    var out = document.getElementById(output);
    var i = 0;
    var y = 'a';
    out.innerHTML += '<tr id="' + y + '"></tr>';
    items.forEach(item => {
        i++;
        var ot = document.getElementById(y);
        ot.innerHTML += '<td id="' + i + '"></td>';
        item.ishow_img(i);
        item.ishow_name(i);
        item.ishow_addbtn(i);
        console.log(i + " " + i%3);
        if (i % 3 == 0) {
            
            y += 'a';
            out.innerHTML += '<tr id="' + y + '"></tr>';
        }
        
    });
}
function cart_show(output) {
    var storedIds = JSON.parse(localStorage.getItem('ids')) || [];
    
    ids = storedIds;
    console.log('Stored IDs:', storedIds);
    var out = document.getElementById(output);
    if (storedIds == null || storedIds.length === 0) {
        out.innerHTML = '<tr style="display: inline-block; width: 50%; border: 0px"><td>Cosul este gol</td></tr>';
        console.log("empty");
    } else {
        var i = 0;
    var y = 'a';
    out.innerHTML = '<tr id="' + y + '"></tr>';
    items.forEach(item => {
        
        var ot = document.getElementById(y);
        
        if (ids.includes(item.id)) {
            i++;
            ot.innerHTML += '<td id="' + i + '"></td>';
            item.ishow_img(i);
        item.ishow_name(i);
        item.ishow_rembtn(i);
        console.log(i + " " + i%2);
        if (i % 2 == 0) {
            
            y += 'a';
            out.innerHTML += '<tr id="' + y + '"></tr>';
        }
        }
        
        
    });
    }

    


}
function get_imput(id)
{
    var imput = document.getElementById(id);
    var value = imput.value;
    return value;
}
function calculate_price()
{
    var value = 0;
    items.forEach(item =>{
        if (ids.includes(item.id)){
            value+=item.price;
        }
    })
    return value;
}
function pret_total(output){
    var out = document.getElementById(output);
    var value = calculate_price();
    out.innerHTML = value;
}
function proces_order(){
    const newOrder = {
        price: calculate_price(),
        name: get_imput("nume"),
        surename: get_imput("prenume"),
        cardnr: get_imput("card_number"),
        mmyy: get_imput("mm_yy"),
        cvv: get_imput("cvv"),
        email: get_imput("e_mail"),
        itemids: JSON.stringify(ids)
    };
    const orderText = `Price: ${newOrder.price}\nName: ${newOrder.name}\nSurename: ${newOrder.surename}\nCard Number: ${newOrder.cardnr}\nMM/YY: ${newOrder.mmyy}\nCVV: ${newOrder.cvv}\nEmail: ${newOrder.email}\nItem IDs: ${newOrder.itemids}`;
    const blob = new Blob([orderText], { type: 'text/plain' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'order.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}