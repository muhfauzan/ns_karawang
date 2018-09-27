DROP TABLE rectifier;

CREATE TABLE nsk.rectifier (
	site_id VARCHAR(6) NOT NULL,
    brand VARCHAR(20),
    entity INT,
    capacity INT,
    current_load INT,
    PRIMARY KEY (site_id)
);

INSERT INTO rectifier (site_id, brand, entity, capacity, current_load)
VALUES ('BKS143', 'Wiraky', 3, '1500', 80);

SELECT * FROM rectifier;