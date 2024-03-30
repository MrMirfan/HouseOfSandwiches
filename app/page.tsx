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
import { Receipt } from "@/interfaces/Receipt";
import NumberInput from "@/components/ui/numberinput";

export default function Home() {

  const [foodMenu, setFoodMenu] = useState<MenuCard[]>([]);
  const [receipt, setReceipt] = useState<Receipt>({
    Orders: [],
    Total: 0,
  });

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

  const addTakeawayItem = (item: MenuCard) => {

    console.log(receipt);
    // Check if the item is already in the receipt
    const existingItem = receipt?.Orders.find((order) => order.item.Id === item.Id);
    if (existingItem) {
      // If the item is already in the receipt, increment the quantity
      setReceipt({
        ...receipt,
        Orders: receipt.Orders.map((order) =>
          order.item.Id === item.Id ? { item, quantity: order.quantity + 1 } : order
        ),
        Total: receipt.Total + parseInt(Number(item.Offer) > 0 ? item.Offer : item.TakeAway),
      });
    } else {
      // If the item is not in the receipt, add it with a quantity of 1
      setReceipt({
        Orders: [...(receipt?.Orders || []), { item, quantity: 1 }],
        Total: (receipt?.Total || 0) + parseInt(Number(item.Offer) > 0 ? item.Offer : item.TakeAway),
      });
    }
  };

  const handleTabChange = () => {
    setReceipt({ Orders: [], Total: 0 });
  };


  return (
    <main>

      <div className=" m-5 bg-zinc-100 rounded-full text-center">

        <h1 className="text-5xl font-bold tracking-wide">
            House
            Of
            Sandwiches
        </h1>

      </div>

      <div className="container block md:flex md:flex-wrap md:gap-x-10">

        <Tabs defaultValue="delivery" className=" md:w-2/3">
          <TabsList className="grid w-full grid-cols-2" onClick={handleTabChange}>
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
                    <Table className="border-b-2 border-black table-fixed">
                      <TableHeader className=" border-b-2 border-black text-lg">
                        <TableRow>
                          <TableHead className="font-bold text-black">Dish</TableHead>
                          <TableHead className="font-bold text-black">Delivery</TableHead>
                          <TableHead className="font-bold text-black">Offer</TableHead>
                          <TableHead className="font-bold text-black">Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, itemIndex) => (
                          <TableRow key={itemIndex} className="text-lg">
                            <TableCell>{item.Item}</TableCell>
                            {Number(item.Offer) > 0 ? <><TableCell className=" line-through after:content-['₹']">{item.Delivery}</TableCell></> : <TableCell className="after:content-['₹']">{item.Delivery}</TableCell>}
                            {Number(item.Offer) > 0 ? <><TableCell className="after:content-['₹']">{item.Offer}</TableCell></> : <TableCell className=" after:content-['₹']">{item.Delivery}</TableCell>}
                            <TableCell>
                              <NumberInput
                                item={item}
                                addTakeawayItem={addTakeawayItem}
                              />
                            </TableCell>
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
                          <TableHead className="font-bold text-black">Quantity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item, itemIndex) => (
                          <TableRow key={itemIndex} className="text-lg">
                            <TableCell>{item.Item}</TableCell>
                            {Number(item.Offer) > 0 ? <><TableCell className=" line-through after:content-['₹']">{item.TakeAway}</TableCell></> : <TableCell className="after:content-['₹']">{item.TakeAway}</TableCell>}
                            {Number(item.Offer) > 0 ? <><TableCell className="after:content-['₹']">{item.Offer}</TableCell></> : <TableCell className=" after:content-['₹']">{item.TakeAway}</TableCell>}
                            <TableCell>
                              <NumberInput
                                item={item}
                                addTakeawayItem={addTakeawayItem}
                              />
                            </TableCell>
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

        <Card className=" md:fixed md:right-10 md:w-1/4">
          <CardHeader>
            <CardTitle>Your Orders</CardTitle>
            <CardDescription>Happy to Feast U</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {
                  receipt.Orders.map((order) => (
                    <TableRow key={order.item.Id}>
                      <TableCell className="w-full">{order.item.Item}</TableCell>
                      <TableCell className="w-full">{order.quantity}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
              <TableFooter className="my-2">
                <TableRow className="my-2">
                  <TableCell>
                    Total
                  </TableCell>
                  <TableCell className=" after:content-['₹']">
                    {receipt.Total}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>

      </div>

    </main>
  );
}
