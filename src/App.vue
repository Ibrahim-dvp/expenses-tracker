<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpense from "./components/IncomeExpense.vue";
import TransactionsList from "./components/TransactionsList.vue";
import AddTransaction from "./components/AddTransaction.vue";

import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";

// Get toast interface
const toast = useToast();

const transactions = ref([]);

// * check the localStorage for the transactions
onMounted(() => {
	const savedTransactions = JSON.parse(localStorage.getItem("allTransactions"));
	if (savedTransactions) {
		transactions.value = savedTransactions;
	}
});

// * Save to localStorage
const saveTransactionsToLoacalStorage = () => {
	localStorage.setItem("allTransactions", JSON.stringify(transactions.value));
};

// * Get Total Balance
const total = computed(() => {
	return transactions.value.reduce((acc, transaction) => {
		return acc + transaction.amount;
	}, 0);
});

// * Get Incomes
const income = computed(() => {
	return transactions.value
		.filter((transaction) => {
			return transaction.amount > 0;
		})
		.reduce((acc, transaction) => {
			return acc + transaction.amount;
		}, 0)
		.toFixed(2);
});

// * Get Expenses

const expense = computed(() => {
	return transactions.value
		.filter((transaction) => {
			return transaction.amount < 0;
		})
		.reduce((acc, transaction) => {
			return transaction.amount + acc;
		}, 0)
		.toFixed(2);
});

// * Handle addTransaction event

const handleTransaction = (transactionData) => {
	// * add the transaction
	transactions.value.push({
		id: generateUniqueID(),
		title: transactionData.title,
		amount: transactionData.amount,
	});
	// store it to localStorage
	saveTransactionsToLoacalStorage();

	// show success message
	toast.success("Transaction Added");
	console.log(transactions.value);
};

// * Function to generate random ID
const generateUniqueID = () => {
	return Math.floor(Math.random() * 100000);
};

// * Handle deleteTransaction event
const handleTransactionDeletions = (id) => {
	// delete the transaction selected
	transactions.value = transactions.value.filter((trans) => trans.id !== id);

	// store it to localStorage
	saveTransactionsToLoacalStorage();

	// show success message
	toast.success("Transaction deleted");
};
</script>
<template>
	<Header />
	<div class="container">
		<Balance :total="total" />
		<IncomeExpense :income="+income" :expense="+expense" />
		<TransactionsList
			:transactions="transactions"
			@transaction-deleted="handleTransactionDeletions"
		/>
		<AddTransaction @transaction-submitted="handleTransaction" />
	</div>
</template>
