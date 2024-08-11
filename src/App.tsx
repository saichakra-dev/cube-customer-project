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
  const [imagesFetched, setImagesFetched] = useState<number | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      // Simulated customer data
      const customerData: Customer[] = [
        {
          id: 1,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  1",
          images: [],
        },
        {
          id: 2,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  2",
          images: [],
        },
        {
          id: 3,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  3",
          images: [],
        },
        {
          id: 4,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  4",
          images: [],
        },
        {
          id: 5,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  5",
          images: [],
        },
        {
          id: 6,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  6",
          images: [],
        },
        {
          id: 7,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  7",
          images: [],
        },
        {
          id: 8,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  8",
          images: [],
        },
        {
          id: 9,
          description:
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.  9",
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
            images: data.map((img: any) => img.urls.thumb), // Use 'thumb' for small size
          };

          setSelectedCustomer(updatedCustomer);
          setImagesFetched(selectedCustomer.id);
        } catch (error) {
          console.error("Error fetching images from Unsplash", error);
        }
      }
    };

    if (selectedCustomer && imagesFetched !== selectedCustomer.id) {
      fetchImages();
    }

    // Fetch images every 10 seconds only if a customer is selected
    const interval = setInterval(() => {
      if (selectedCustomer) {
        fetchImages();
      }
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on component unmount or customer change
  }, [selectedCustomer, imagesFetched]);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setImagesFetched(null); // Reset imagesFetched to allow fetching images for the newly selected customer
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
              <p>{customer.description.slice(0, 180)}...</p>
            </div>
          ))}
        </div>
        <div className="details">
          {selectedCustomer && (
            <>
              <h2 className="center-heading">
                Customer {selectedCustomer.id} Details here
              </h2>
              <p>{selectedCustomer.description}</p>
              <div className="image-grid">
                {selectedCustomer.images.length === 0 ? (
                  <p>No images available</p>
                ) : (
                  selectedCustomer.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Customer ${selectedCustomer.id} Image ${index}`}
                      style={{
                        width: "200px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
