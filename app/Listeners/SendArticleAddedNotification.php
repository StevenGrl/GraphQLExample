<?php

namespace App\Listeners;

use App\Events\ArticleAdded;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendArticleAddedNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     * @param ArticleAdded $event
     */
    public function handle(ArticleAdded $event): void
    {
        //
    }
}
