import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor() { }

  selectedValue=0;
  itemsReceived: any;
  pricePerItem: any;
  email:string='';
  error:string='';
  user:string='test@test.com';
  removeStock = false;

  products=[
    {
        "productId":1,
        "items":200,
        "price":10
    },
    {
        "productId":2,
        "items":400,
        "price":20
    },
    {
        "productId":3,
        "items":330,
        "price":15
    }
]

  options = [
    {id: 1, productName: 'Product 1'},
    {id: 2, productName: 'Product 2'},
    {id: 3, productName: 'Product 3'}
  ];

  ngOnInit(): void { }

  addRemoveStock(value:any){
    let objIndex = this.products.findIndex((obj => obj.productId == this.selectedValue));
    if(this.selectedValue!==0){
      switch(value) {
        case 1:
          if(this.itemsReceived && this.pricePerItem){
            this.products[objIndex].items = this.itemsReceived;

            //update average price
            let averagePrice = this.itemsReceived / this.pricePerItem;
            this.products[objIndex].price = parseFloat(averagePrice.toFixed(2));

            //clear the fields and display success message
            this.itemsReceived = '';
            this.pricePerItem = '';
            this.error= 'item added';
          }else{
            this.error = 'check input - make sure all input fields are filled';
          }
          break;
        case 2:
          if(this.itemsReceived > 0 && this.email){
            if(this.email == this.user){
              if((this.products[objIndex].items>=this.itemsReceived)){
                this.products[objIndex].items -= this.itemsReceived;
                this.email = '';
                this.itemsReceived = '';
                this.error = 'item removed';
              }else{
                this.error = 'not enough stock to remove';
                this.itemsReceived = '';
              }
            }else{
              this.error = 'cannot remove item - email address not found!!';
            }
          }
          else{
            this.error = 'check input - make sure all input fields are filled'
          }
          
          break;
      }
  }
  }
  
  onChange(productValue: any) {
    this.selectedValue = productValue.target.value;
  }

  changeForm(){
    this.error = '';
    this.removeStock=!this.removeStock;
  }
}
