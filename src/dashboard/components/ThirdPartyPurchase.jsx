import React from 'react'

const ThirdPartyPurchase = ({data}) => {
  console.log(data)
  return (
    <div>
      <p>Quantity: {data.item_quantity}</p> 
      <p>Cost: £{data.item_cost}</p> 
      <p>Description: {data.item_description}</p> 
      <p>Seller's Contact Details: {data.sellers_contact_details}</p> 
      {(data.item_detail_in_brief && data.item_detail_in_brief !== "") && (
        <p>Detail In Brief: {data.item_detail_in_brief}</p> 
      )}
    </div>
  )
}

export default ThirdPartyPurchase