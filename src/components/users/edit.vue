<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<user-form-edit></user-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import userFormEdit from '@/components/users/form-edit';

export default {
	name: 'user-edit',
	components: {
		navbar:	navbar,
		userFormEdit: userFormEdit
	}
}
</script>
