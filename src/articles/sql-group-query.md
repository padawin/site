## SQL group query

### Context

Let's suppose you have a table A and a table B linked together with a
one-to-many (or many-to-many) relationship.
### Issue

How to get, for each row of A, one row of B matching a specific
condition?

### Pattern query

	SELECT
		t1.champ1,
		t2.champ2
	FROM
		t1
		LEFT JOIN t2 ON
			t2.id = (
				SELECT
					id
				FROM
					t2
				WHERE
					t1.id = id_t1
					%your condition here%
				ORDER BY %your order here%
				LIMIT 1
			);

### Example

You have a customers table and an orders table. You wish to get the date
of the last order of each customer:

	SELECT
		customer.name,
		order.date
	FROM
		customer
		LEFT JOIN order ON
			order.id = (
				SELECT
					id
				FROM
					order
				WHERE
					customer.id = id_customer
				ORDER BY date DESC
				LIMIT 1
			);
