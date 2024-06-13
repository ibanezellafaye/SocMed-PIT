<?php
// Login.php (Model)

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Login extends Model
{
    protected $fillable = [
        'email',
        'password',
    ];
}