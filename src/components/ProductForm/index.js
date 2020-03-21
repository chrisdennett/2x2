import React, { useState, useContext, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'

import StoreContext from '~/context/StoreContext'

const ProductForm = ({ product }) => {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product
  const [variant, setVariant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId, variants]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleOptionChange = (optionIndex, { target }) => {
    const { value } = target
    const currentOptions = [...variant.selectedOptions]

    currentOptions[optionIndex] = {
      ...currentOptions[optionIndex],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant({ ...selectedVariant })
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  /* 
  Using this in conjunction with a select input for variants 
  can cause a bug where the buy button is disabled, this 
  happens when only one variant is available and it's not the
  first one in the dropdown list. I didn't feel like putting 
  in time to fix this since its an edge case and most people
  wouldn't want to use dropdown styled selector anyways - 
  at least if the have a sense for good design lol.
  */
  const checkDisabled = (name, value) => {
    const match = find(variants, {
      selectedOptions: [
        {
          name: name,
          value: value,
        },
      ],
    })
    if (match === undefined) return true
    if (match.availableForSale === true) return false
    return true
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  return (
    <>
      <h3>{price}</h3>
      <div>
        {options.map(({ id, name, values }, index) => (
          <Variation key={id}>
            <FormLabel htmlFor={name}>{name} </FormLabel>
            <FormSelect
              name={name}
              key={id}
              onChange={event => handleOptionChange(index, event)}
            >
              {values.map(value => (
                <option
                  value={value}
                  key={`${name}-${value}`}
                  disabled={checkDisabled(name, value)}
                >
                  {value}
                </option>
              ))}
            </FormSelect>
          </Variation>
        ))}
      </div>

      <Quantity>
        <FormLabel htmlFor="quantity">Quantity </FormLabel>
        <QuantityInput
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
        />
      </Quantity>
      <SubmitButton
        type="submit"
        disabled={!available || adding}
        onClick={handleAddToCart}
      >
        Add to Basket
      </SubmitButton>
      {!available && <p>This Product is out of Stock!</p>}
    </>
  )
}

export default ProductForm

const FormLabel = styled.label`
  min-width: 80px;
  display: inline-block;
`
const FormSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  width: 150px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`

const Variation = styled.div`
  margin-bottom: 10px;
`
const Quantity = styled.div`
  margin-bottom: 10px;
`
const QuantityInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  width: 130px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  background: orange;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  margin-top: 20px;
  border-radius: 5px;
  text-transform: capitalize;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`
