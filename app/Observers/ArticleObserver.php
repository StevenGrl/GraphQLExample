<?php

namespace App\Observers;

use App\Events\ArticleAdded;
use App\Models\Article;

class ArticleObserver
{
    /**
     * Handle the Article "created" event.
     * @param Article $article
     */
    public function created(Article $article): void
    {
//        event(new ArticleAdded($article));
//        ArticleAdded::dispatch($article);
//        ArticleAdded::broadcast($article);
        broadcast(new ArticleAdded($article));
    }

    /**
     * Handle the Article "updated" event.
     * @param Article $article
     */
    public function updated(Article $article): void
    {
        //
    }

    /**
     * Handle the Article "deleted" event.
     * @param Article $article
     */
    public function deleted(Article $article): void
    {
//        event(new ArticleAdded($article));
//        ArticleAdded::dispatch($article);
    }

    /**
     * Handle the Article "restored" event.
     * @param Article $article
     */
    public function restored(Article $article): void
    {
        //
    }

    /**
     * Handle the Article "force deleted" event.
     * @param Article $article
     */
    public function forceDeleted(Article $article): void
    {
        //
    }
}
