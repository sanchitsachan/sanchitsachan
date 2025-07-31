<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Broker extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'logo',
        'website_url',
        'description',
        'overall_score',
        'trading_cost_score',
        'speed_score',
        'support_score',
        'platform_score',
        'regulation_score',
        'minimum_deposit',
        'maximum_leverage',
        'spread_eur_usd',
        'spread_gbp_usd',
        'spread_usd_jpy',
        'headquarters',
        'founded_year',
        'regulation_bodies',
        'account_types',
        'trading_platforms',
        'payment_methods',
        'supported_languages',
        'customer_support',
        'is_featured',
        'is_recommended',
        'is_scam',
        'status',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'regulation_bodies' => 'array',
        'account_types' => 'array',
        'trading_platforms' => 'array',
        'payment_methods' => 'array',
        'supported_languages' => 'array',
        'customer_support' => 'array',
        'is_featured' => 'boolean',
        'is_recommended' => 'boolean',
        'is_scam' => 'boolean',
        'overall_score' => 'decimal:2',
        'trading_cost_score' => 'decimal:2',
        'speed_score' => 'decimal:2',
        'support_score' => 'decimal:2',
        'platform_score' => 'decimal:2',
        'regulation_score' => 'decimal:2',
        'spread_eur_usd' => 'decimal:2',
        'spread_gbp_usd' => 'decimal:2',
        'spread_usd_jpy' => 'decimal:2',
    ];

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function scamReports(): HasMany
    {
        return $this->hasMany(ScamReport::class);
    }

    public function spreads(): HasMany
    {
        return $this->hasMany(Spread::class);
    }

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->reviews()->where('status', 'approved')->avg('rating');
    }

    public function getReviewsCountAttribute()
    {
        return $this->reviews()->where('status', 'approved')->count();
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeRecommended($query)
    {
        return $query->where('is_recommended', true);
    }

    public function scopeNotScam($query)
    {
        return $query->where('is_scam', false);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
