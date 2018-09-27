CREATE TABLE genset (
	site_id VARCHAR(6),
    brand VARCHAR(30),
    power_capacity INT,
    fuel_capacity INT,    
    PRIMARY KEY (site_id)
);

INSERT INTO genset (site_id, brand, power_capacity, fuel_capacity)
VALUES ('BKS126', 'Honda', 5000, 10);

SELECT * FROM genset;