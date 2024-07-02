<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $standard = Role::create(['name' => 'standard']);

        $permission_read = Permission::create(['name' => 'read users']);
        $permission_edit = Permission::create(['name' => 'edit users']);
        $permission_create = Permission::create(['name' => 'create users']);
        $permission_delete = Permission::create(['name' => 'delete users']);

        $admin->givePermissionTo([$permission_read, $permission_edit, $permission_create, $permission_delete]);
        $standard->givePermissionTo([$permission_read]);
    }
}
