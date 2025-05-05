import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminListProducts from '@/components/admin/products/AdminListProducts';
import AdminAddProduct from '@/components/admin/products/AdminAddProduct';
import AdminListOrders from '@/components/admin/orders/AdminListOrders';
import AdminModifyOrder from '@/components/admin/orders/AdminModifyOrder';
import AdminListUsers from '@/components/admin/users/AdminListUsers';
import AdminModifyUser from '@/components/admin/users/AdminModifyUser';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminDashboard = () => {
  return (
    <main className="flex min-h-screen  w-full flex-col items-center justify-start gap-3 mt-10">
      <AdminHeader />

      <Tabs
        className="w-full flex-1 flex-col items-center "
        defaultValue="tab1"
        orientation="horizontal"
      >
        <TabsList className="flex flex-col md:flex-row md:gap-6 mb-10 md:mb-6">
          <TabsTrigger value="tab1">Produits</TabsTrigger>
          <TabsTrigger value="tab2">Commandes</TabsTrigger>
          <TabsTrigger value="tab3">Utilisateurs</TabsTrigger>
        </TabsList>
        <div className="h-px bg-gray-200 my-3 mx-auto w-[95%] " />

        <TabsContent value="tab1" className="w-full">
          <Tabs
            className="w-full flex-1 flex-col items-center mt-6"
            defaultValue="tab1"
            orientation="horizontal"
          >
            <TabsList className="flex flex-col md:flex-row md:gap-6 mb-10 md:mb-6">
              <TabsTrigger
                value="tab1"
                className="text-xs font-medium data-[state=active]:!bg-slate-400"
              >
                Liste des produits
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="text-xs font-medium data-[state=active]:!bg-slate-400"
              >
                Ajouter un produit
              </TabsTrigger>
            </TabsList>
            <div className="h-px bg-gray-200 my-3 mx-auto w-[95%] " />
            <TabsContent value="tab1" className="w-full">
              <AdminListProducts />
            </TabsContent>
            <TabsContent value="tab2" className="w-full">
              <AdminAddProduct />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="tab2" className="w-full">
          <Tabs
            className="w-full flex-1 flex-col items-center mt-6"
            defaultValue="tab1"
            orientation="horizontal"
          >
            <TabsList className="flex flex-col md:flex-row md:gap-6 mb-10 md:mb-6">
              <TabsTrigger
                value="tab1"
                className="text-xs font-medium data-[state=active]:!bg-slate-400"
              >
                Liste des Commandes
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="text-xs font-medium data-[state=active]:!bg-slate-400"
              >
                Modifier une commande
              </TabsTrigger>
            </TabsList>
            <div className="h-px bg-gray-200 my-3 mx-auto w-[95%] " />
            <TabsContent value="tab1" className="w-full">
              <AdminListOrders />
            </TabsContent>
            <TabsContent value="tab2" className="w-full">
              <AdminModifyOrder />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="tab3" className="w-full">
          <Tabs
            className="w-full flex-1 flex-col items-center mt-6"
            defaultValue="tab1"
            orientation="horizontal"
          >
            <TabsList className="flex flex-col md:flex-row md:gap-6 mb-10 md:mb-6">
              <TabsTrigger
                value="tab1"
                className="text-xs font-medium data-[state=active]:!bg-slate-400"
              >
                Liste des Utilisateurs
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="text-xs font-medium data-[state=active]:!bg-slate-400"
              >
                Modifier un utilisateur
              </TabsTrigger>
            </TabsList>
            <div className="h-px bg-gray-200 my-3 mx-auto w-[70%] " />
            <TabsContent value="tab1" className="w-full">
              <AdminListUsers />
            </TabsContent>
            <TabsContent value="tab2" className="w-full">
              <AdminModifyUser />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AdminDashboard;
