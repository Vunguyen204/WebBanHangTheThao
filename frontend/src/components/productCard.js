import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CurrencyFormat from "./currencyFormat";
import "./productCard.scss"; 

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="productCard">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.image_url} alt={product.name} />
        <Card.Body> 
          <Card.Text className="price"> 
            <CurrencyFormat value={product.price} />
          </Card.Text>
          <Card.Title>{product.name}</Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductCard;
