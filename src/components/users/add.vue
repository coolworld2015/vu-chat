<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<user-form-add></user-form-add>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import userFormAdd from '@/components/users/form-add';

export default {
	name: 'user-add',
	components: {
		navbar:	navbar,
		userFormAdd: userFormAdd
	}
}
</script>
