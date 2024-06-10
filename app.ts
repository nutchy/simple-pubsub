import {
  LowStockWarningSubscriber,
  MachineSaleSubscriber,
  MachineRefillSubscriber,
  StockLevelOkSubscriber
} from './subscribers'
import { IPublishSubscribeService } from './events'
import { MachineEventPublisher } from './publishers'
import { MachineRepository } from './repositories'
import { EventType } from './events'
import { eventGenerator } from './helpers/generator'

// program
;(async () => {
  // 1. create 3 machines with a quantity of 10 stock
  const machineRepository = MachineRepository.instance

  // 2. create the PubSub service with empty subscriber
  const pubSubService: IPublishSubscribeService = MachineEventPublisher.instance

  // 3. create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber(
    machineRepository,
    pubSubService
  )
  const refillSubscriber = new MachineRefillSubscriber(
    machineRepository,
    pubSubService
  )
  const lowStockSubscriber = new LowStockWarningSubscriber()
  const stockLevelOkSubscriber = new StockLevelOkSubscriber()

  // 4. register all subscriber into pubsub
  pubSubService.subscribe(EventType.MachineSale, saleSubscriber)
  pubSubService.subscribe(EventType.MachineRefill, refillSubscriber)
  pubSubService.subscribe(EventType.LowStockWarning, lowStockSubscriber)
  pubSubService.subscribe(EventType.StockLevelOk, stockLevelOkSubscriber)

  // 5. create 5 random events
  const events = [1, 2, 3, 4, 5].map((_) => eventGenerator())

  // 6. publish the events
  for (const e of events) {
    pubSubService.publish(e)
  }
})()
