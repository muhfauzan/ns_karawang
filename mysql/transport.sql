CREATE TABLE transport (
	site_id VARCHAR(6),
    mac_add  VARCHAR(17),
    transport_type VARCHAR(20),
    far_end VARCHAR(30),
    metro VARCHAR(15),
    port_metro VARCHAR(10),
    service VARCHAR(4),
    clock VARCHAR(4),
    oam VARCHAR(4),
    2g VARCHAR(4),
    cplane VARCHAR(4),
    uplane VARCHAR(4),
    PRIMARY KEY (site_id)
);

DROP TABLE transport;

INSERT INTO transport (site_id, mac_add, transport_type, far_end, metro, port_metro, service, clock, oam, 2g, cplane, uplane)
VALUES ('BKS125', 'E4:68:A3:53:5F:B2', 'GPON', 'BKS125', 'ME-D2-BKS', '1/2/12', '1234', '1234', '1234', '1234', '1234', '1234');

SELECT * FROM transport;