'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import fetchmenu from "@/data/foodmenu"
import { MenuCard } from "@/interfaces/MenuCard";

export default function Home() {

  const [foodMenu, setFoodMenu] = useState<MenuCard[]>([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        let menuData = await fetchmenu; // Invoke fetchmenu function
        setFoodMenu(menuData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData(); // Invoke the async function immediately
  }, []);

  // Function to group menu items by category
  const groupByCategory = (menuItems: MenuCard[]) => {
    const groupedMenu: { [key: string]: MenuCard[] } = {};

    menuItems.forEach((item) => {
      if (!groupedMenu[item.Category]) {
        groupedMenu[item.Category] = [];
      }
      groupedMenu[item.Category].push(item);
    });

    return groupedMenu;
  };

  return (
    <main>

      <div className=" container my-3 flex bg-zinc-100">

        <Image
          src="/logos/homelogo.jpg"
          width={100}
          height={100}
          alt="Picture of the author"
          className="rounded-full"
        />

      </div>

      <div className="container flex gap-x-12 ">

        <Tabs defaultValue="delivery" className=" w-2/3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
            <TabsTrigger value="takeaway">Takeaway</TabsTrigger>
          </TabsList>
          
          <TabsContent value="delivery" className="my-6">
            
            {/* Delivery */}
            <Accordion type="single" collapsible className="w-full p-2 rounded-3xl outline-dashed bg-zinc-100">
              {Object.entries(groupByCategory(foodMenu)).map(([category, items], index) => (
                <AccordionItem key={index} value={`category-${index}`}>
                  <AccordionTrigger className="mx-3"><span className="p-2 border-2 border-black rounded-full">{category}</span></AccordionTrigger>
                  <AccordionContent>
                    <Table className="border-b-2 border-black">
                      <TableHeader className=" border-b-2 border-black text-lg">
                        <TableRow>
                          <TableHead className="font-bold text-black">Dish</TableHead>
                          <TableHead className="font-bold text-black">Delivery</TableHead>
                          <TableHead className="font-bold text-black">Offer</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, itemIndex) => (
                          <TableRow key={itemIndex} className="text-lg">
                            <TableCell>{item.Item}</TableCell>
                            {Number(item.Offer) > 0 ? <><TableCell className=" line-through after:content-['₹']">{item.Delivery}</TableCell><TableCell className="after:content-['₹']">{item.Offer}</TableCell></> : <TableCell className="after:content-['₹']">{item.Delivery}</TableCell>}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          
          </TabsContent>

          <TabsContent value="takeaway" className="my-6">
          
            {/* TakeAway */}
            <Accordion type="single" collapsible className="w-full p-2 rounded-3xl outline-dashed bg-zinc-100">
              {Object.entries(groupByCategory(foodMenu)).map(([category, items], index) => (
                <AccordionItem key={index} value={`category-${index}`}>
                  <AccordionTrigger className="mx-3"><span className="p-2 border-2 border-black rounded-full">{category}</span></AccordionTrigger>
                  <AccordionContent>
                    <Table className="border-b-2 border-black">
                      <TableHeader className=" border-b-2 border-black text-lg">
                        <TableRow>
                          <TableHead className="font-bold text-black">Dish</TableHead>
                          <TableHead className="font-bold text-black">Takeaway</TableHead>
                          <TableHead className="font-bold text-black">Offer</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, itemIndex) => (
                          <TableRow key={itemIndex} className="text-lg">
                            <TableCell>{item.Item}</TableCell>
                            {Number(item.Offer) > 0 ? <><TableCell className=" line-through after:content-['₹']">{item.TakeAway}</TableCell><TableCell className="after:content-['₹']">{item.Offer}</TableCell></> : <TableCell className="after:content-['₹']">{item.Delivery}</TableCell>}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

          </TabsContent>

        </Tabs>

        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>Happy to Feast U</CardDescription>
          </CardHeader>
          <CardContent>

          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>

      </div>

    </main>
  );
}
