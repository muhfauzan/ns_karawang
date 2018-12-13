INSERT INTO nsk.activity (site_id, category, activity, act_date)
VALUES ('BKS002', 'Power', 'Battery upgrade', '2018-07-14' );

SELECT * FROM activity;
SELECT * FROM battery;


UPDATE activity SET site_id = 'BKS456', category = 'Testing2', activity='Testing2', act_date = '' WHERE id = '6';

TRUNCATE TABLE activity;

DELETE FROM activity WHERE id='1';

SELECT activity.id, activity.site_id, site.site_name, activity.category, activity.activity, activity.act_date 
FROM activity 
INNER JOIN site ON activity.site_id=site.site_id
WHERE activity.site_id='BKS125';