DROP TABLE eas;

CREATE TABLE eas (
	site_id VARCHAR(6),
    mains_fail VARCHAR(3),
    modulerecti_fail VARCHAR(3),
    battery_stolen VARCHAR(3),
    PRIMARY KEY (site_id)
);

INSERT INTO eas (site_id, mains_fail, modulerecti_fail, battery_stolen)
VALUES ('BKS124', 'OK', 'NY', 'NOK');

SELECT * FROM eas;

