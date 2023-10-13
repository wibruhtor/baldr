<script lang="ts" context="module">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { PUBLIC_SITE_VERSION, PUBLIC_SERVER_VERSION } from '$env/static/public';
	import Telegram from '$lib/components/ui/icon/telegram.svelte';
	import { Mail } from 'lucide-svelte';
	import Discord from '$lib/components/ui/icon/discord.svelte';
	import { HoverCard, HoverCardTrigger } from '$lib/components/ui/hover-card';
	import HoverCardContent from '$lib/components/ui/hover-card/hover-card-content.svelte';
</script>

<script lang="ts">
</script>

<Card class="min-w-0 max-w-3xl w-full mx-auto">
	<CardHeader>
		<CardTitle>О проекте</CardTitle>
	</CardHeader>
	<CardContent>
		<h2 class="typography-large mb-1">Кто автор?</h2>
		<p class="mb-4 text-muted-foreground">
			Автором являюсь я&nbsp;&mdash; BruhaBruh. С&nbsp;радостью с&nbsp;вами пообщаюсь
			в&nbsp;Telegram, ссылка на&nbsp;него ниже.
		</p>
		<h2 class="typography-large mb-1">Зачем проект был создан?</h2>
		<p class="mb-4 text-muted-foreground">
			Проект &laquo;WiBruhTor&raquo; был создан, в&nbsp;первую очередь, для удобства стримеров.
			Поэтому именно они и&nbsp;будут являться главным приоритетом и&nbsp;движением для улучшения
			сервиса.
		</p>
		<h2 class="typography-large mb-1">Могу&nbsp;ли я&nbsp;его использовать бесплатно?</h2>
		<p class="mb-4 text-muted-foreground">
			Да, вы&nbsp;можете. Однако для серверной части куплен VDS, который нужно оплачивать, поэтому
			я&nbsp;с&nbsp;радостью приму пожертвования для его работы, для связи используйте Telegram.
		</p>
		<h2 class="typography-large mb-1">У&nbsp;меня проблема, как её&nbsp;исправить?</h2>
		<p class="mb-4 text-muted-foreground">
			При любой проблеме я&nbsp;вам бесплатно помогу, для этого вам нужно всего лишь написать мне
			в&nbsp;Telegram. Время ответа до&nbsp;24&nbsp;часов.
		</p>
		<h2 class="typography-large mb-1">Проект Open Source?</h2>
		<p class="mb-4 text-muted-foreground">
			Нет, проект не&nbsp;open source, но&nbsp;я&nbsp;думаю над тем, чтобы сделать его код открытым,
			зависит от&nbsp;feedback&rsquo;а.
		</p>
		<p class="typography-muted">А&nbsp;ещё я&nbsp;хочу кушать, напиши мне для доната &lt;3</p>
	</CardContent>
	<CardFooter class="flex items-center gap-2">
		<Button variant="secondary" href="/">Вернуться на главную</Button>
		<HoverCard>
			<HoverCardTrigger>
				<Button size="icon" variant="ghost" href="https://t.me/bruhabruh4">
					<Telegram class="h-4 w-4 scale-[1.75]" />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent class="w-max">
				<p class="typography-small">Время ответа до 24 часов</p>
				<a href="https://t.me/bruhabruh4" class="typography-muted">@bruhabruh4</a>
			</HoverCardContent>
		</HoverCard>
		<HoverCard>
			<HoverCardTrigger>
				<Button size="icon" variant="ghost" href="https://discordapp.com/users/319124448068370432">
					<Discord class="h-4 w-4" />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent class="w-max">
				<p class="typography-small">Время ответа до 72 часов</p>
				<a href="https://discordapp.com/users/319124448068370432" class="typography-muted">
					@319124448068370432
				</a>
			</HoverCardContent>
		</HoverCard>
		<HoverCard>
			<HoverCardTrigger>
				<Button size="icon" variant="ghost" href="mailto:contact@bruhabruh.ru">
					<Mail class="h-4 w-4" />
				</Button>
			</HoverCardTrigger>
			<HoverCardContent class="w-max">
				<p class="typography-small">Время ответа до 48 часов</p>
				<a href="mailto:contact@bruhabruh.ru" class="typography-muted">contact@bruhabruh.ru</a>
			</HoverCardContent>
		</HoverCard>
		<div class="ml-auto flex items-center gap-1">
			<p class="typography-muted">Версия сайта v{PUBLIC_SITE_VERSION}</p>
			<p class="typography-muted">Версия сервера v{PUBLIC_SERVER_VERSION}</p>
		</div>
	</CardFooter>
</Card>
