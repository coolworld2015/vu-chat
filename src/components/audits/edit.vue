<template>
	<div class="wrapper">
		<navbar></navbar>
		<div class="content">
			<main>
				<section class="search-results">
					<audit-form-edit></audit-form-edit>
				</section>
			</main>
		</div>
	</div>	
</template>

<script>
import navbar from '@/components/common/navbar';
import auditFormEdit from '@/components/audits/form-edit';

export default {
	name: 'audit-edit',
	components: {
		navbar:	navbar,
		auditFormEdit: auditFormEdit
	}
}
</script>
