<script lang="ts" context="module">
	import type { ChatHideSettings } from '$lib/types/api/entity/chat-settings';
	import type { Errors } from '$lib/utils/createForm';
	import type { UpdateChatSettingsRequest } from '$lib/types/api/request/chat-settings';
</script>

<script lang="ts">
	export let hideSettings: ChatHideSettings;
	export let errors: Errors<UpdateChatSettingsRequest>['hide'];
	export let isLoading: boolean;
</script>

<pre>{JSON.stringify(hideSettings, null, 2)}</pre>
