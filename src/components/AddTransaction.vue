<template>
	<h3>Add new transaction</h3>
	<form id="form" @submit.prevent="HandleSubmition">
		<div class="form-control">
			<label for="text">Text</label>
			<input type="text" id="text" v-model="title" placeholder="Enter text..." />
		</div>
		<div class="form-control">
			<label for="amount"
				>Amount <br />
				(negative - expense, positive - income)</label
			>
			<input
				type="number"
				id="amount"
				v-model="amount"
				placeholder="Enter amount..."
			/>
		</div>
		<button class="btn">Add transaction</button>
	</form>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

// Get toast interface
const toast = useToast();

// * variables binded with the inputs values
const title = ref("");
const amount = ref("");

// * Declare the event to emit
const emit = defineEmits(["transactionSubmitted"]);

const HandleSubmition = () => {
	if (title.value !== "" && amount.value !== "") {
		const transactionData = {
			title: title.value,
			amount: amount.value,
		};
		emit("transactionSubmitted", transactionData);
		title.value = "";
		amount.value = "";
	} else {
		toast.error("All the fields should be fill");
	}
};
// const title = =title;
</script>
