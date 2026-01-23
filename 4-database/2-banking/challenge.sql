/*
    Challenge: Implement a Secure Fund Transfer Function

    In this challenge, you will implement a PostgreSQL stored function to simulate transferring funds 
    between two accounts in a banking system. The function must follow proper validation, ensure data 
    integrity, and log transactions with a shared reference.

    Your function should be named:
    banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)

    The function must:

    - Prevent transfers to the same account
    - Ensure the transfer amount is greater than zero
    - Validate that both sender and recipient accounts exist
    - Prevent transfers if either account is marked as "frozen"
    - Ensure the sender has sufficient funds
    - Debit the sender and credit the recipient atomically
    - Log two transactions: a withdrawal and a deposit, both linked by the same UUID reference
    - Raise meaningful exceptions for all validation failures

    The function should perform all operations within a safe transactional context, maintaining 
    database consistency even in the event of failure.

    Notes:
    - In order to test you can mock some additional data in the tables that participates in this challenge.
    - Make sure of raising errors when they're present

    ERD:
    +---------------------+            +--------------------------+
    |     accounts        |            |      transactions        |
    +---------------------+            +--------------------------+
    | account_id (PK)     |<-----------| transaction_id (PK)      |
    | balance             |            | account_id (FK)          |
    | status              |            | amount                   |
    +---------------------+            | transaction_type         |
                                       | reference                |
                                       | transaction_date         |
                                       +--------------------------+
*/


-- your solution here


create or replace function banking.transfer_funds(from_id int, to_id int, amount numeric)
returns void
language plpgsql
as
$$
declare
	sender_balance numeric;
   	sender_status text;
	receiver_status text;
	uuid_reference uuid := gen_random_uuid();
begin
	if from_id = to_id then
		raise exception 'Can''t transfer to same account';
	end if;

	if amount <= 0 then
		raise exception 'The amount must be greater than zero';
	end if;
	
	select balance, status into sender_balance, sender_status
	from banking.accounts
	where account_id = from_id
	for update;
	
	if not found then
		raise exception 'Sender account doesn''t not exist';
	end if;
	
	select status into receiver_status
	from banking.accounts
	where account_id = to_id
	for update;
	
	if not found then
		raise exception 'Receiver account doesn''t not exist';
	end if;
	
	if sender_status = 'frozen' then 
		raise exception 'Sender account is frozen';
	end if;
	
	if receiver_status = 'frozen' then 
		raise exception 'Receiver account is frozen';
	end if;
	
	if sender_balance < amount then
		raise exception 'Sender has not sufficient funds';
	end if;
	
   	update banking.accounts
   	set balance = balance - amount
   	where  account_id = from_id;
   	
   	update banking.accounts
   	set balance = balance + amount
   	where  account_id = to_id;
   	
   	insert into banking.transactions(account_id, amount, transaction_type, reference, transaction_date)
   	values (from_id, amount, 'withdrawal', uuid_reference, now()); 
   	
   	insert into banking.transactions(account_id, amount, transaction_type, reference, transaction_date)
   	values (to_id, amount, 'deposit', uuid_reference, now()); 
		
end;
$$;


/* Test the function */

/* Read previous values*/
select * from banking.accounts where account_id in (1, 2);

/* Execte transaction*/
select banking.transfer_funds(1, 2, 300);

/* To check if is correct*/
select * from banking.accounts where account_id in (1, 2);
select * from banking.transactions order by transaction_date desc limit 2;

/* Error escenarios*/

-- select banking.transfer_funds(1, 1, 100);
/*SQL Error [P0001]: ERROR: Can't transfer to same account
  Where: PL/pgSQL function banking.transfer_funds(integer,integer,numeric) line 9 at RAISE*/

-- select banking.transfer_funds(1, 2, -50);
/*SQL Error [P0001]: ERROR: The amount must be greater than zero
  Where: PL/pgSQL function banking.transfer_funds(integer,integer,numeric) line 13 at RAISE*/

-- select banking.transfer_funds(99, 2, 100);
/*SQL Error [P0001]: ERROR: Sender account doesn't not exist
  Where: PL/pgSQL function banking.transfer_funds(integer,integer,numeric) line 22 at RAISE*/

-- select banking.transfer_funds(1, 3, 100);
/*SQL Error [P0001]: ERROR: Receiver account is frozen
  Where: PL/pgSQL function banking.transfer_funds(integer,integer,numeric) line 39 at RAISE*/

-- select banking.transfer_funds(4, 2, 100);
/*SQL Error [P0001]: ERROR: Sender has not sufficient funds
  Where: PL/pgSQL function banking.transfer_funds(integer,integer,numeric) line 43 at RAISE*/
