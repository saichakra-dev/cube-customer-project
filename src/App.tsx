import React, { useState, useEffect } from "react";
import "./App.css";

type Customer = {
  id: number;
  description: string;
  images: string[];
};

const unsplashAccessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      // Simulate fetching customer data
      const customerData: Customer[] = [
        {
          id: 1,
          description: "Lorem ipsum dolor sit amet...",
          images: [],
        },
        {
          id: 2,
          description: "Lorem ipsum dolor sit amet...",
          images: [],
        },
        {
          id: 3,
          description: "Lorem ipsum dolor sit amet...",
          images: [],
        },
        {
          id: 4,
          description: "Lorem ipsum dolor sit amet...",
          images: [],
        },
      ];

      setCustomers(customerData);
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (selectedCustomer) {
        try {
          const response = await fetch(
            `https://api.unsplash.com/photos/random?count=6&client_id=${unsplashAccessKey}`
          );
          if (!response.ok) {
            throw new Error("Error fetching images from Unsplash");
          }
          const data = await response.json();

          const updatedCustomer = {
            ...selectedCustomer,
            images: data.map((img: any) => img.urls.small),
          };

          setSelectedCustomer(updatedCustomer);
        } catch (error) {
          console.error("Error fetching images from Unsplash", error);
        }
      }
    };

    // Fetch images initially when a customer is selected
    if (selectedCustomer) {
      fetchImages();
      const interval = setInterval(() => {
        fetchImages();
      }, 10000); // Refresh images every 10 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount or customer change
    }
  }, [selectedCustomer]);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Customer Details Portal</h1>
      </nav>
      <div className="container">
        <div className="sidebar">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className={`customer-card ${
                selectedCustomer?.id === customer.id ? "selected" : ""
              }`}
              onClick={() => handleCustomerClick(customer)}
            >
              <h2>Customer 0{customer.id}</h2>
              <p>{customer.description.slice(0, 60)}...</p>
            </div>
          ))}
        </div>
        <div className="details">
          {selectedCustomer && (
            <>
              <h2 className="center-heading">
                Customer {selectedCustomer.id} Details
              </h2>
              <p>{selectedCustomer.description}</p>
              <div className="image-grid">
                {selectedCustomer.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Customer ${selectedCustomer.id} Image ${index}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
