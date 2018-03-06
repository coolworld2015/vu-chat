<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results"  style="overflow:auto;">
					<car-form-edit></car-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import carFormEdit from '@/components/cars/form-edit';

export default {
	name: 'car-edit',
	components: {
		navbar,
		carFormEdit
	}
}
</script>
