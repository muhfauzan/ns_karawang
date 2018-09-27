CREATE TABLE battery (
	site_id VARCHAR(6) NOT NULL,
    brand VARCHAR(20),
    bank int,
    install_date date,
    protection VARCHAR(50),
    backup_time int, 
    PRIMARY KEY (site_id)
);

INSERT INTO nsk.battery (site_id, brand, bank, install_date, protection, backup_time)
VALUES ('BKS013', 'Shoto', 3, '2018-07-14', 'Kerangkeng', 2 );

SELECT * FROM battery;

DROP TABLE battery;